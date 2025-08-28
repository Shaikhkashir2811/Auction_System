import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAuctionItem = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startingBid, setStartingBid] = useState("");
	const [endDate, setEndDate] = useState("");
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("jwt="))
			?.split("=")[1];

		if (!token) {
			setError("You must be logged in to create an auction.");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("description", description);
			formData.append("startingBid", startingBid);
			formData.append("endDate", endDate);
			if (image) {
				formData.append("image", image);
			}

			await axios.post(
				"/api/auctions",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data", // Important for file uploads
					},
				}
			);
			navigate("/profile");
		} catch (err) {
			setError("Failed to create auction. Please check your data and try again.");
			console.error(err);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white shadow-xl rounded-lg overflow-hidden">
					<div className="p-6 sm:p-10">
						<h2 className="text-3xl font-extrabold text-black mb-8 text-center">
							Create a New Auction Item
						</h2>
						{error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="title"
									className="block text-sm font-medium text-gray-700"
								>
									Title
								</label>
								<input
									id="title"
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-700"
								>
									Description
								</label>
								<textarea
									id="description"
									rows="4"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="image"
									className="block text-sm font-medium text-gray-700"
								>
									Image
								</label>
								<input
									id="image"
									type="file"
									onChange={(e) => setImage(e.target.files[0])}
									className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-800 hover:file:bg-gray-300"
								/>
							</div>
							<div>
								<label
									htmlFor="startingBid"
									className="block text-sm font-medium text-gray-700"
								>
									Starting Bid ($)
								</label>
								<input
									id="startingBid"
									type="number"
									value={startingBid}
									onChange={(e) => setStartingBid(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
									min={0}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="endDate"
									className="block text-sm font-medium text-gray-700"
								>
									End Date
								</label>
								<input
									id="endDate"
									type="datetime-local"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
									required
								/>
							</div>
							<div className="pt-4">
								<button
									type="submit"
									className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
								>
									Create Auction
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateAuctionItem;