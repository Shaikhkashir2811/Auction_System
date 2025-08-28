const AuctionItem = require("../models/AuctionItem");
const Bid = require("../models/Bid");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const express = require('express');
// const path = require('path'); // Make sure you import path
const app = express();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// --- Multer Configuration and Middleware Export ---
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Note: The 'uploads' directory must exist in the root of your project
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

const fileFilter = (req, file, cb) => {
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error("Error: Images Only!"));
	}
};

// Export the multer middleware directly to use in your routes
const upload = multer({
	storage: storage,
	limits: { fileSize: 10000000 }, // 10MB limit
	fileFilter: fileFilter,
});

// --- Controller Functions ---

const createAuctionItem = async (req, res) => {
	const { title, description, startingBid, endDate } = req.body;
	const userId = req.user.id;

	if (!req.file) {
		return res.status(400).json({ message: "Image is required." });
	}

	const imagePath = `/uploads/${req.file.filename}`;

	try {
		const newDate = new Date(endDate);
		const auctionItem = await AuctionItem.create({
			title,
			description,
			startingBid,
			endDate: newDate,
			image: imagePath,
			createdBy: userId,
		});

		res.status(201).json(auctionItem);
	} catch (error) {
		console.error("Error creating auction item:", error);
		res.status(500).json({ message: "Failed to create auction item.", error: error.message });
	}
};

const getAuctionItems = async (req, res) => {
	try {
		const auctionItems = await AuctionItem.find();
		res.status(200).json(auctionItems);
	} catch (error) {
		console.error("Error fetching auction items:", error);
		res.status(500).json({ message: "Failed to fetch auction items.", error: error.message });
	}
};

const getAuctionItemById = async (req, res) => {
	const { id } = req.params;
	try {
		const auctionItem = await AuctionItem.findById(id);
		if (!auctionItem) {
			return res.status(404).json({ message: "Auction item not found" });
		}
		res.status(200).json(auctionItem);
	} catch (error) {
		console.error("Error fetching auction item by ID:", error);
		res.status(500).json({ message: "Failed to fetch auction item.", error: error.message });
	}
};

const getAuctionItemsByUser = async (req, res) => {
	try {
		const userId = req.user.id;
		const auctionItems = await AuctionItem.find({ createdBy: userId });
		res.status(200).json({ auctionItems });
	} catch (error) {
		console.error("Error fetching auction items by user:", error);
		res.status(500).json({ message: "Failed to fetch user's auction items.", error: error.message });
	}
};

const updateAuctionItem = async (req, res) => {
	const { id } = req.params;
	const { title, description, startingBid, endDate } = req.body;
	const userId = req.user.id;

	try {
		const auctionItem = await AuctionItem.findById(id);

		if (!auctionItem) {
			return res.status(404).json({ message: "Auction item not found" });
		}

		if (auctionItem.createdBy.toString() !== userId) {
			return res.status(403).json({ message: "Unauthorized action" });
		}

		if (req.file) {
			const oldImagePath = path.join(__dirname, '..', auctionItem.image);
			if (fs.existsSync(oldImagePath)) {
				fs.unlink(oldImagePath, (unlinkErr) => {
					if (unlinkErr) console.error("Failed to delete old image:", unlinkErr);
				});
			}
			auctionItem.image = `/uploads/${req.file.filename}`;
		}

		auctionItem.title = title || auctionItem.title;
		auctionItem.description = description || auctionItem.description;
		auctionItem.startingBid = startingBid || auctionItem.startingBid;
		auctionItem.endDate = endDate
			? new Date(endDate)
			: auctionItem.endDate;

		auctionItem.updatedAt = new Date();
		await auctionItem.save();

		res.json(auctionItem);
	} catch (error) {
		console.error("Error updating auction item:", error);
		res.status(500).json({ message: "Failed to update auction item.", error: error.message });
	}
};

const deleteAuctionItem = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;

	try {
		const auctionItem = await AuctionItem.findById(id);

		if (!auctionItem) {
			return res.status(404).json({ message: "Auction item not found" });
		}

		if (auctionItem.createdBy.toString() !== userId) {
			return res.status(403).json({ message: "Unauthorized action" });
		}

		if (auctionItem.image) {
			const imagePath = path.join(__dirname, '..', auctionItem.image);
			if (fs.existsSync(imagePath)) {
				fs.unlink(imagePath, (unlinkErr) => {
					if (unlinkErr) console.error("Failed to delete image file:", unlinkErr);
				});
			}
		}

		await Bid.deleteMany({ auctionItemId: id });
		await auctionItem.deleteOne();

		res.json({ message: "Auction item and its bids removed successfully." });
	} catch (error) {
		console.error("Error deleting auction item:", error);
		res.status(500).json({ message: "Failed to delete auction item.", error: error.message });
	}
};

const getAuctionWinner = async (req, res) => {
	const { id } = req.params;
	try {
		const auctionItem = await AuctionItem.findById(id);
		if (!auctionItem) {
			return res.status(404).json({ winner: null, message: "Auction item not found" });
		}

		if (new Date(auctionItem.endDate) > new Date()) {
			return res.status(400).json({ winner: null, message: "Auction has not ended yet" });
		}

		const bids = await Bid.find({ auctionItemId: id }).sort({ bidAmount: -1 });

		if (bids.length === 0) {
			return res.status(200).json({ winner: null, message: "No bids found" });
		}

		const highestBid = bids[0];

		const winner = await User.findById(highestBid.userId).select('-password');
		if (!winner) {
			return res.status(404).json({ winner: null, message: "Winner not found" });
		}

		res.status(200).json({ winner });
	} catch (error) {
		console.error("Error fetching auction winner:", error);
		res.status(500).json({ message: "Failed to fetch auction winner.", error: error.message });
	}
};

const getAuctionsWonByUser = async (req, res) => {
	try {
		const userId = req.user.id;
		const bidsByUser = await Bid.find({ userId }).sort({ bidAmount: -1 });

		const wonAuctions = [];
		const processedAuctionIds = new Set();

		for (const bid of bidsByUser) {
			if (processedAuctionIds.has(bid.auctionItemId.toString())) {
				continue;
			}

			const auctionItem = await AuctionItem.findById(bid.auctionItemId);
			if (!auctionItem) {
				continue;
			}

			if (new Date(auctionItem.endDate) > new Date()) {
				continue;
			}

			const winningBid = await Bid.findOne({ auctionItemId: bid.auctionItemId }).sort({ bidAmount: -1 });

			if (winningBid && winningBid.userId.toString() === userId) {
				wonAuctions.push({
					auctionId: auctionItem._id,
					title: auctionItem.title,
					description: auctionItem.description,
					image: auctionItem.image,
					winningBid: winningBid.bidAmount,
					endDate: auctionItem.endDate,
				});
				processedAuctionIds.add(auctionItem._id.toString());
			}
		}
		res.status(200).json({ wonAuctions });
	} catch (error) {
		console.error("Error fetching won auctions:", error);
		res.status(500).json({ message: "Failed to fetch won auctions.", error: error.message });
	}
};

module.exports = {
	upload,
	createAuctionItem,
	getAuctionItems,
	updateAuctionItem,
	deleteAuctionItem,
	getAuctionItemById,
	getAuctionItemsByUser,
	getAuctionWinner,
	getAuctionsWonByUser,
};