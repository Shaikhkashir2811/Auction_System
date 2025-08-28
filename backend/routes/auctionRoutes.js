const express = require("express");
const {
	upload,
	createAuctionItem,
	getAuctionItems,
	updateAuctionItem,
	deleteAuctionItem,
	getAuctionItemById,
	getAuctionItemsByUser,
	getAuctionWinner,
	getAuctionsWonByUser,
} = require("../controllers/auctionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/")
	.get(getAuctionItems)
	.post(authMiddleware, upload.single('image'), createAuctionItem);

router.get("/user", authMiddleware, getAuctionItemsByUser);

router.get("/winner/:id", getAuctionWinner);

router.post("/won", authMiddleware, getAuctionsWonByUser);

router
	.route("/:id")
	.get(getAuctionItemById)
	.put(authMiddleware, upload.single('image'), updateAuctionItem)
	.delete(authMiddleware, deleteAuctionItem);

module.exports = router;