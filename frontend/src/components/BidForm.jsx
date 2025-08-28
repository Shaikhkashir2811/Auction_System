import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BidForm = () => {
	const { id } = useParams();
	const [auctionItem, setAuctionItem] = useState(null);
	const [currentBid, setCurrentBid] = useState(0);
	const [bidAmount, setBidAmount] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAuctionItem = async () => {
			try {
				const res = await axios.get(`/api/auctions/${id}`);
				setAuctionItem(res.data);

				// Fetch current highest bid
				const currentHighestBid = await fetchCurrentHighestBid(id);
				const displayBid = currentHighestBid || res.data.startingBid;

				setCurrentBid(displayBid);
				setBidAmount(displayBid + 1 || ""); // Set minimum bid to current + 1
			} catch (error) {
				console.error("Error fetching auction item:", error);
			}
		};

		fetchAuctionItem();
	}, [id]);

	const fetchCurrentHighestBid = async (auctionId) => {
		try {
			const res = await axios.get(`/api/bids/${auctionId}/highest`);
			return res.data.bidAmount;
		} catch (error) {
			console.error("Error fetching current bid:", error);
			return null;
		}
	};

	const handleBid = async (e) => {
		e.preventDefault();
		try {
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("jwt="))
				?.split("=")[1];
			await axios.post(
				"/api/bids",
				{ auctionItemId: id, bidAmount },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			navigate(`/auction/${id}`);
		} catch (err) {
			console.error(err);
		}
	};

	if (!auctionItem) return <div>Loading...</div>;

	return (
		<div className="min-h-screen bg-gray-100 p-4 sm:p-8">
			{/* Back Button */}
			<div className="max-w-2xl mx-auto mb-6">
				<button
					onClick={() => navigate('/auctions')}
					className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 hover:border-black transition-all duration-200"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span>‹ Back to Auctions</span>
				</button>
			</div>

			{/* Main Content */}
			<div className="flex items-center justify-center">
				<div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg border border-gray-200">
					{/* Breadcrumb */}
					<nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
						<button
							onClick={() => navigate('/')}
							className="hover:text-black transition-colors duration-200"
						>
							Auctions
						</button>
						<span>›</span>
						<button
							onClick={() => navigate(`/auction/${id}`)}
							className="hover:text-black transition-colors duration-200"
						>
							{auctionItem.title}
						</button>
						<span>›</span>
						<span className="text-black font-medium">Place Bid</span>
					</nav>

					<h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
						Place a Bid
					</h2>

					{/* Auction Item Info */}
					<div className="p-6 mb-6 bg-gray-50 border border-gray-200 rounded-lg">
						<h3 className="text-lg font-bold text-gray-900 mb-2">
							{auctionItem.title}
						</h3>
						<p className="text-sm text-gray-600 mb-4 line-clamp-2">
							{auctionItem.description}
						</p>
						<div className="flex justify-between items-center">
							<div>
								<p className="text-sm font-semibold text-gray-700 mb-1">
									Current Highest Bid
								</p>
								<p className="text-2xl font-extrabold text-black">
									₹{currentBid.toFixed(2)}
								</p>
								{currentBid > auctionItem.startingBid && (
									<p className="text-xs text-gray-500 mt-1">
										Starting bid: ₹{auctionItem.startingBid.toFixed(2)}
									</p>
								)}
							</div>
							<div className="text-right">
								<p className="text-sm font-semibold text-gray-700 mb-1">
									Time Remaining
								</p>
								<p className="text-sm text-gray-600">
									{new Date(auctionItem.endDate).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</p>
							</div>
						</div>
					</div>

					<form onSubmit={handleBid} className="space-y-6">
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-1">
								Your Bid Amount
							</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
									₹
								</span>
								<input
									type="number"
									className="w-full pl-8 pr-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors text-lg"
									value={bidAmount}
									onChange={(e) => setBidAmount(e.target.value)}
									min={currentBid + 1}
									required
									placeholder="Enter your bid amount"
								/>
							</div>
							<p className="text-sm text-gray-500 mt-1">
								Minimum bid: ₹{(currentBid + 1).toFixed(2)} (current bid + ₹1)
							</p>
						</div>

						<div className="flex space-x-4">
							<button
								type="button"
								onClick={() => navigate(`/auction/${id}`)}
								className="flex-1 py-4 text-lg font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="flex-1 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black"
							>
								▸ Place Bid
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BidForm;