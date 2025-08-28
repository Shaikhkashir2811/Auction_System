import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 12;
const BACKEND_URL = "http://localhost:5000";

function AuctionList() {
	const [auctionItems, setAuctionItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [activeStatus, setActiveStatus] = useState("live"); // New state for status filter

	useEffect(() => {
		const fetchAuctionItems = async () => {
			try {
				const res = await axios.get(`${BACKEND_URL}/api/auctions`);
				setAuctionItems(res.data);
				setSearchResults(res.data);
				setTotalPages(Math.ceil(res.data.length / ITEMS_PER_PAGE));
			} catch (error) {
				console.error("Error fetching auction items:", error);
			}
		};
		fetchAuctionItems();
	}, []);

	// Helper function to check if auction is ended
	const isAuctionEnded = (endDate) => {
		const now = new Date();
		const auctionEndDate = new Date(endDate);
		return auctionEndDate <= now;
	};

	useEffect(() => {
		const filterItems = () => {
			let filteredItems = auctionItems.filter((item) => {
				const title = item.title || "";
				const description = item.description || "";
				const startingBid = item.startingBid
					? item.startingBid.toString()
					: "";
				const endDate = item.endDate
					? new Date(item.endDate).toLocaleDateString()
					: "";

				const searchTermString = searchTerm.toLowerCase();

				const matchesTitle = title.toLowerCase().includes(searchTermString);
				const matchesDescription = description
					.toLowerCase()
					.includes(searchTermString);
				const matchesStartingBid = startingBid.includes(searchTermString);
				const matchesEndDate = endDate.includes(searchTermString);

				const matchesSearch =
					matchesTitle ||
					matchesDescription ||
					matchesStartingBid ||
					matchesEndDate;

				// Filter by status
				const isEnded = isAuctionEnded(item.endDate);
				const matchesStatus = activeStatus === "live" ? !isEnded : isEnded;

				return matchesSearch && matchesStatus;
			});

			setSearchResults(filteredItems);
			setTotalPages(Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 0);
			setCurrentPage(1);
		};
		filterItems();
	}, [searchTerm, auctionItems, activeStatus]);

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const handleStatusChange = (status) => {
		setActiveStatus(status);
	};

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedItems = searchResults.slice(startIndex, endIndex);

	const formatEndDate = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const timeDiff = date.getTime() - now.getTime();
		const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (daysDiff > 0) {
			return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} remaining`;
		} else if (daysDiff === 0) {
			return "Ends today";
		} else {
			return "Auction ended";
		}
	};

	// Count live and completed auctions
	const liveAuctionsCount = auctionItems.filter(item => !isAuctionEnded(item.endDate)).length;
	const completedAuctionsCount = auctionItems.filter(item => isAuctionEnded(item.endDate)).length;

	const AuctionCard = ({ item }) => {
		const ended = isAuctionEnded(item.endDate);

		return (
			<div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
				<div className="relative h-48 bg-gray-100 overflow-hidden">
					{item.image ? (
						<img
							src={`${BACKEND_URL}${item.image}`}
							alt={item.title}
							className="w-full h-full object-contain object-center"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-gray-50 border-b border-gray-200">
							<div className="text-center">
								<svg
									className="w-12 h-12 mx-auto text-gray-400 mb-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<span className="text-sm text-gray-500">◊ No Image Available</span>
							</div>
						</div>
					)}
					<div className="absolute top-3 right-3">
						<span className={`px-3 py-1 rounded-full text-xs font-semibold ${ended
							? "bg-red text-black border border-gray-400"
							: "bg-black text-white border border-gray-400"
							}`}>
							{ended ? "■ Ended" : "● Live"}
						</span>
					</div>
					<div className="absolute top-3 left-3">
						<span className="bg-black text-white px-2 py-1 rounded-full text-xs font-medium">
							{formatEndDate(item.endDate)}
						</span>
					</div>
				</div>

				<div className="p-6">
					<div className="mb-3">
						<Link
							to={`/auction/${item._id}`}
							className="text-xl font-bold text-black hover:text-gray-700 transition-colors duration-200 line-clamp-2 block"
						>
							{item.title}
						</Link>
					</div>

					<p className="text-gray-600 text-sm mb-4 line-clamp-2">
						{item.description}
					</p>

					<div className="space-y-3 mb-6">
						<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
							<span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
								₹ Starting Bid
							</span>
							<span className="text-lg font-bold text-black">
								₹{item.startingBid?.toLocaleString()}
							</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
							<span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
								◷ End Date
							</span>
							<span className="text-sm font-medium text-gray-700">
								{new Date(item.endDate).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</div>
					</div>

					<div className="flex gap-3">
						<Link
							to={`/auction/${item._id}`}
							className="flex-1 bg-black text-white text-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-semibold"
						>
							▸ View Details
						</Link>
						<button className="px-4 py-3 border-2 border-black text-black rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-semibold">
							☆ Watch
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-6 py-8">
				{/* Header Section */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-black mb-4">▲ Premium Auctions</h1>
					<p className="text-xl text-gray-600">
						Discover and bid on premium items from verified sellers worldwide
					</p>
				</div>

				{/* Status Filter Tabs */}
				<div className="mb-8">
					<div className="bg-gray-100 p-2 rounded-xl inline-flex">
						<button
							onClick={() => handleStatusChange("live")}
							className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center space-x-2 ${activeStatus === "live"
								? "bg-black text-white shadow-md"
								: "text-gray-600 hover:text-black hover:bg-white"
								}`}
						>
							<span>●</span>
							<span>Live Auctions</span>
							<span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
								{liveAuctionsCount}
							</span>
						</button>
						<button
							onClick={() => handleStatusChange("completed")}
							className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center space-x-2 ${activeStatus === "completed"
								? "bg-black text-white shadow-md"
								: "text-gray-600 hover:text-black hover:bg-white"
								}`}
						>
							<span>■</span>
							<span>Completed Auctions</span>
							<span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
								{completedAuctionsCount}
							</span>
						</button>
					</div>
				</div>

				{/* Search Bar */}
				<div className="mb-8">
					<div className="relative max-w-lg">
						<input
							type="text"
							placeholder={`Search ${activeStatus} auctions...`}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black text-lg"
						/>
						<svg
							className="absolute left-4 top-4.5 h-6 w-6 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>

				{/* Results Counter */}
				<div className="mb-6">
					<p className="text-lg text-gray-600 font-medium">
						▣ Showing <span className="font-bold text-black">{paginatedItems.length}</span> of{" "}
						<span className="font-bold text-black">{searchResults.length}</span> {activeStatus} auctions
					</p>
				</div>

				{/* Auction Grid */}
				{paginatedItems.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
						{paginatedItems.map((item) => (
							<AuctionCard key={item._id} item={item} />
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<div className="text-8xl mb-6 text-gray-300">
							{activeStatus === "live" ? "◊" : "▣"}
						</div>
						<h3 className="text-2xl font-bold text-gray-700 mb-4">
							No {activeStatus} auctions found
						</h3>
						<p className="text-lg text-gray-500 mb-6">
							{searchTerm
								? `No auctions match your search "${searchTerm}" in ${activeStatus} auctions.`
								: `There are currently no ${activeStatus} auctions available.`
							}
						</p>
						{searchTerm && (
							<button
								onClick={() => setSearchTerm("")}
								className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold"
							>
								Clear Search
							</button>
						)}
					</div>
				)}

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex justify-center items-center space-x-4">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							className={`px-6 py-3 border-2 rounded-lg text-sm font-semibold transition-all duration-200 ${currentPage === 1
								? "text-gray-400 cursor-not-allowed bg-gray-50 border-gray-200"
								: "text-black hover:bg-gray-50 border-gray-300"
								}`}
							disabled={currentPage === 1}
						>
							‹ Previous
						</button>

						<div className="flex space-x-2">
							{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
								let pageNum;
								if (totalPages <= 5) {
									pageNum = i + 1;
								} else if (currentPage <= 3) {
									pageNum = i + 1;
								} else if (currentPage >= totalPages - 2) {
									pageNum = totalPages - 4 + i;
								} else {
									pageNum = currentPage - 2 + i;
								}

								return (
									<button
										key={pageNum}
										onClick={() => handlePageChange(pageNum)}
										className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${currentPage === pageNum
											? "bg-black text-white shadow-md"
											: "text-black hover:bg-gray-100 border-2 border-gray-300"
											}`}
									>
										{pageNum}
									</button>
								);
							})}
						</div>

						<button
							onClick={() => handlePageChange(currentPage + 1)}
							className={`px-6 py-3 border-2 rounded-lg text-sm font-semibold transition-all duration-200 ${totalPages === 0 || currentPage === totalPages
								? "text-gray-400 cursor-not-allowed bg-gray-50 border-gray-200"
								: "text-black hover:bg-gray-50 border-gray-300"
								}`}
							disabled={totalPages === 0 || currentPage === totalPages}
						>
							Next ›
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default AuctionList;