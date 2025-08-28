import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditAuctionItem = () => {
	const { id } = useParams();
	const [auctionItem, setAuctionItem] = useState({
		title: "",
		description: "",
		startingBid: "",
		endDate: "",
	});
	const [imageFile, setImageFile] = useState(null); // State for the new image file
	const [imagePreview, setImagePreview] = useState(null); // State for the image preview
	const navigate = useNavigate();

	// Fetch the existing auction item data to populate the form
	useEffect(() => {
		const fetchAuctionItem = async () => {
			try {
				const res = await axios.get(`/api/auctions/${id}`);
				setAuctionItem(res.data);
				setImagePreview(res.data.image); // Set initial image preview from the database
			} catch (error) {
				console.error("Error fetching auction item:", error);
			}
		};
		fetchAuctionItem();
	}, [id]);

	// Handle changes to form inputs, including the file input
	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "image") {
			const file = files[0];
			setImageFile(file);
			// Create a URL for the image preview
			setImagePreview(URL.createObjectURL(file));
		} else {
			setAuctionItem((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	// Handle form submission to update the auction item
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create a new FormData object for sending multipart/form-data
		const formData = new FormData();
		formData.append("title", auctionItem.title);
		formData.append("description", auctionItem.description);
		formData.append("startingBid", auctionItem.startingBid);
		formData.append("endDate", auctionItem.endDate);

		// Append the image file if one was selected
		if (imageFile) {
			formData.append("image", imageFile);
		}

		try {
			await axios.put(`/api/auctions/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			navigate(`/auction/${id}`);
		} catch (error) {
			console.error("Error updating auction item:", error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
			<div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg border border-gray-200">
				<h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
					Edit Auction Item
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={auctionItem.title}
							onChange={handleChange}
							className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
						/>
					</div>
					<div>
						<label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
							Description
						</label>
						<textarea
							id="description"
							name="description"
							value={auctionItem.description}
							onChange={handleChange}
							rows="4"
							className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
						/>
					</div>
					<div>
						<label htmlFor="startingBid" className="block text-sm font-semibold text-gray-700 mb-1">
							Starting Bid
						</label>
						<input
							type="number"
							id="startingBid"
							name="startingBid"
							value={auctionItem.startingBid}
							onChange={handleChange}
							className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
						/>
					</div>
					<div>
						<label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-1">
							End Date
						</label>
						<input
							type="datetime-local"
							id="endDate"
							name="endDate"
							value={auctionItem.endDate}
							onChange={handleChange}
							className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
						/>
					</div>
					<div>
						<label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
							Image
						</label>
						<input
							type="file"
							id="image"
							name="image"
							onChange={handleChange}
							className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
						/>
						{imagePreview && (
							<img
								src={imagePreview}
								alt="Image Preview"
								className="mt-4 w-full h-auto rounded-lg object-cover"
							/>
						)}
					</div>
					<button
						type="submit"
						className="w-full py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black"
					>
						Update Auction Item
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditAuctionItem;
