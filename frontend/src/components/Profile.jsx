import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the number of items to show per page for each section.
const ITEMS_PER_PAGE = 3;

// Auction House icon
const AuctionIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-text-bottom mr-2">
		<rect x="2" y="10" width="20" height="12" rx="2" ry="2"></rect>
		<path d="M12 2v8"></path>
		<path d="M16 6l-4-4-4 4"></path>
	</svg>
);

// Bids Tag icon
const BidIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-text-bottom mr-2">
		<path d="M4 14.899A7 7 0 1 0 16.903 16.903"></path>
		<path d="M15.404 16.904 22 22"></path>
		<path d="M13.565 14.565 16.902 16.902"></path>
		<circle cx="12" cy="12" r="3"></circle>
	</svg>
);

// Trophy icon for won auctions
const TrophyIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-text-bottom mr-2">
		<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
		<path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
		<path d="M4 22h16"></path>
		<path d="M10 14v-2"></path>
		<path d="M14 14v-2"></path>
		<path d="M12 22v-6H8v6"></path>
		<path d="M12 22v-6h4v6"></path>
		<circle cx="12" cy="9" r="3"></circle>
	</svg>
);

// Plus icon for create auction button
const PlusIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle ml-2">
		<path d="M5 12h14"></path>
		<path d="M12 5v14"></path>
	</svg>
);

// Magnifying glass for view auction button
const SearchIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle ml-2">
		<circle cx="11" cy="11" r="8"></circle>
		<path d="m21 21-4.3-4.3"></path>
	</svg>
);

/**
 * A React component to display a user's profile, including their account details,
 * created auctions, bids, and won auctions. It features a clean, light theme
 * with clear and organized card layouts.
 */
function Profile() {
	const [user, setUser] = useState(null);
	const [auctions, setAuctions] = useState([]);
	const [bids, setBids] = useState([]);
	const [wonAuctions, setWonAuctions] = useState([]);
	const [currentPageAuctions, setCurrentPageAuctions] = useState(1);
	const [currentPageBids, setCurrentPageBids] = useState(1);
	const [currentPageWon, setCurrentPageWon] = useState(1);
	const [totalPagesAuctions, setTotalPagesAuctions] = useState(1);
	const [totalPagesBids, setTotalPagesBids] = useState(1);
	const [totalPagesWon, setTotalPagesWon] = useState(1);

	// useEffect hook to fetch all necessary data on component mount
	useEffect(() => {
		// Function to get the JWT token from cookies
		const getToken = () => document.cookie.split("; ").find(row => row.startsWith("jwt="))?.split("=")[1];

		const fetchUser = async () => {
			const token = getToken();
			if (token) {
				try {
					const res = await axios.post("/api/users/profile", {}, {
						headers: { Authorization: `Bearer ${token}` },
					});
					setUser(res.data);
				} catch (error) {
					console.error("Failed to fetch user profile:", error);
				}
			}
		};

		const fetchAuctions = async () => {
			const token = getToken();
			if (token) {
				try {
					const res = await axios.post("/api/auctions/user", {}, {
						headers: { Authorization: `Bearer ${token}` },
					});
					setAuctions(res.data.auctionItems);
					setTotalPagesAuctions(Math.ceil(res.data.auctionItems.length / ITEMS_PER_PAGE));
				} catch (error) {
					console.error("Failed to fetch user's auctions:", error);
				}
			}
		};

		const fetchBids = async () => {
			const token = getToken();
			if (token) {
				try {
					const res = await axios.post("/api/bids/user", {}, {
						headers: { Authorization: `Bearer ${token}` },
					});
					setBids(res.data.bids);
					setTotalPagesBids(Math.ceil(res.data.bids.length / ITEMS_PER_PAGE));
				} catch (error) {
					console.error("Failed to fetch user's bids:", error);
				}
			}
		};

		const fetchWonAuctions = async () => {
			const token = getToken();
			if (token) {
				try {
					const res = await axios.post("/api/auctions/won", {}, {
						headers: { Authorization: `Bearer ${token}` },
					});
					setWonAuctions(res.data.wonAuctions);
					setTotalPagesWon(Math.ceil(res.data.wonAuctions.length / ITEMS_PER_PAGE));
				} catch (error) {
					console.error("Failed to fetch won auctions:", error);
				}
			}
		};

		// Execute all data fetching functions
		fetchUser();
		fetchAuctions();
		fetchBids();
		fetchWonAuctions();
	}, []);

	// Handle pagination for any of the three lists (auctions, bids, won)
	const handlePageChange = (page, type) => {
		if (page > 0) {
			if (type === "auctions") {
				if (page <= totalPagesAuctions) setCurrentPageAuctions(page);
			} else if (type === "bids") {
				if (page <= totalPagesBids) setCurrentPageBids(page);
			} else if (type === "won") {
				if (page <= totalPagesWon) setCurrentPageWon(page);
			}
		}
	};

	// Logic to paginate the lists
	const paginatedAuctions = auctions.slice(
		(currentPageAuctions - 1) * ITEMS_PER_PAGE,
		currentPageAuctions * ITEMS_PER_PAGE
	);
	const paginatedBids = bids.slice(
		(currentPageBids - 1) * ITEMS_PER_PAGE,
		currentPageBids * ITEMS_PER_PAGE
	);
	const paginatedWon = wonAuctions.slice(
		(currentPageWon - 1) * ITEMS_PER_PAGE,
		currentPageWon * ITEMS_PER_PAGE
	);

	// Show a loading spinner if user data is not yet available
	if (!user) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-white">
				<div className="w-16 h-16 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen px-4 py-12 text-gray-900 bg-white font-inter sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				{/* Main Profile Section */}
				<div className="overflow-hidden bg-gray-50 rounded-lg shadow-xl">
					<div className="p-6 sm:p-10">
						{/* Profile Header */}
						<h2 className="mb-6 text-4xl font-extrabold text-black">
							User Profile
						</h2>
						{/* User Info Card */}
						<div className="p-6 mb-8 bg-white rounded-lg shadow-sm border border-gray-200">
							<p className="mb-2 text-xl">
								<span className="font-semibold text-gray-700">Username:</span>{" "}
								{user.username}
							</p>
							<p className="mb-2 text-xl">
								<span className="font-semibold text-gray-700">Email:</span>{" "}
								{user.email}
							</p>
						</div>

						{/* My Auctions Section */}
						<div className="flex flex-col items-center justify-between mb-8 sm:flex-row">
							<h2 className="mb-4 text-3xl font-extrabold text-black sm:mb-0">
								<AuctionIcon />Your Auctions
							</h2>
							<Link
								to="/auction/create"
								className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white transition-all duration-300 transform rounded-full bg-black hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
							>
								Create Auction <PlusIcon />
							</Link>
						</div>

						{/* Display Auctions or a message if none exist */}
						{paginatedAuctions.length > 0 ? (
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{paginatedAuctions.map((auction) => (
									<div
										key={auction._id}
										className="overflow-hidden transition-all duration-300 transform rounded-lg shadow-md bg-gray-50 hover:shadow-xl hover:scale-105"
									>
										{auction.imageUrl && (
											<img
												src={auction.imageUrl}
												alt={auction.title}
												className="object-cover w-full h-48 rounded-t-lg"
											/>
										)}
										<div className="p-6">
											<h3 className="mb-3 text-2xl font-bold text-black">
												{auction.title}
											</h3>
											<p className="mb-4 text-gray-700">
												{auction.description}
											</p>
											<p className="mb-2 text-lg">
												<span className="font-semibold text-gray-700">Starting Bid:</span>{" "}
												<span className="font-bold text-black">₹{auction.startingBid}</span>
											</p>
											<p className="mb-4 text-lg">
												<span className="font-semibold text-gray-700">End Date:</span>{" "}
												<span className="text-gray-600">
													{new Date(auction.endDate).toLocaleString()}
												</span>
											</p>
											<Link
												to={`/auction/${auction._id}`}
												className="inline-flex items-center px-6 py-3 text-white transition-all duration-300 transform rounded-full bg-black hover:bg-gray-800 hover:shadow-md hover:-translate-y-1"
											>
												View Auction <SearchIcon />
											</Link>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-2xl text-gray-500 animate-pulse text-center">
								No active auctions. Ready to start selling?
							</p>
						)}

						{/* Pagination for Auctions */}
						<div className="flex items-center justify-center mt-6 space-x-4">
							<button
								onClick={() => handlePageChange(currentPageAuctions - 1, "auctions")}
								className={`bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentPageAuctions === 1 ? "opacity-50 cursor-not-allowed" : ""
									}`}
								disabled={currentPageAuctions === 1}
							>
								Previous
							</button>
							<span className="text-gray-600">
								Page {currentPageAuctions} of{" "}
								{totalPagesAuctions === 0 ? 1 : totalPagesAuctions}
							</span>
							<button
								onClick={() => handlePageChange(currentPageAuctions + 1, "auctions")}
								className={`bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentPageAuctions === totalPagesAuctions || totalPagesAuctions === 0
									? "opacity-50 cursor-not-allowed"
									: ""
									}`}
								disabled={currentPageAuctions === totalPagesAuctions || totalPagesAuctions === 0}
							>
								Next
							</button>
						</div>

						{/* Your Bids Section */}
						<div className="mt-12">
							<h2 className="mb-8 text-3xl font-extrabold text-black">
								<BidIcon />Your Bids
							</h2>

							{/* Display Bids or a message if none exist */}
							{paginatedBids.length > 0 ? (
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
									{paginatedBids.map((bid) => (
										<div
											key={bid._id}
											className="overflow-hidden transition-all duration-300 transform rounded-lg shadow-md bg-gray-50 hover:shadow-xl hover:scale-105"
										>
											{bid.auctionItem.imageUrl && (
												<img
													src={bid.auctionItem.imageUrl}
													alt={bid.auctionItem.title}
													className="object-cover w-full h-48 rounded-t-lg"
												/>
											)}
											<div className="p-6">
												<h3 className="mb-3 text-2xl font-bold text-black">
													{bid.auctionItem.title}
												</h3>
												<p className="mb-4 text-gray-700">
													{bid.auctionItem.description}
												</p>
												<p className="mb-2 text-lg">
													<span className="font-semibold text-gray-700">Bid Amount:</span>{" "}
													<span className="font-bold text-black">₹{bid.bidAmount}</span>
												</p>
												<p className="mb-4 text-lg">
													<span className="font-semibold text-gray-700">Bid Date:</span>{" "}
													<span className="text-gray-600">
														{new Date(bid.createdAt).toLocaleString()}
													</span>
												</p>
												<Link
													to={`/auction/${bid.auctionItem._id}`}
													className="inline-flex items-center px-6 py-3 text-white transition-all duration-300 transform rounded-full bg-black hover:bg-gray-800 hover:shadow-md hover:-translate-y-1"
												>
													View Auction <SearchIcon />
												</Link>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-2xl text-gray-500 animate-pulse text-center">
									No active bids. Ready to join the excitement?
								</p>
							)}

							{/* Pagination for Bids */}
							<div className="flex items-center justify-center mt-6 space-x-4">
								<button
									onClick={() => handlePageChange(currentPageBids - 1, "bids")}
									className={`bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentPageBids === 1 ? "opacity-50 cursor-not-allowed" : ""
										}`}
									disabled={currentPageBids === 1}
								>
									Previous
								</button>
								<span className="text-gray-600">
									Page {currentPageBids} of{" "}
									{totalPagesBids === 0 ? 1 : totalPagesBids}
								</span>
								<button
									onClick={() => handlePageChange(currentPageBids + 1, "bids")}
									className={`bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentPageBids === totalPagesBids || totalPagesBids === 0
										? "opacity-50 cursor-not-allowed"
										: ""
										}`}
									disabled={currentPageBids === totalPagesBids || totalPagesBids === 0}
								>
									Next
								</button>
							</div>
						</div>

						{/* Your Victorious Auctions Section */}
						<div className="mt-12">
							<h2 className="mb-8 text-3xl font-extrabold text-black">
								<TrophyIcon />Your Victorious Auctions
							</h2>

							{/* Display Won Auctions or a message if none exist */}
							{paginatedWon.length > 0 ? (
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
									{paginatedWon.map((auction) => (
										<div
											key={auction.auctionId}
											className="overflow-hidden transition-all duration-300 transform rounded-lg shadow-md bg-gray-50 hover:shadow-xl hover:scale-105"
										>
											{auction.imageUrl && (
												<img
													src={auction.imageUrl}
													alt={auction.title}
													className="object-cover w-full h-48 rounded-t-lg"
												/>
											)}
											<div className="p-6">
												<h3 className="mb-3 text-2xl font-bold text-black">
													{auction.title}
												</h3>
												<p className="mb-4 text-gray-700">
													{auction.description}
												</p>
												<p className="mb-2 text-lg">
													<span className="font-semibold text-gray-700">Winning Bid:</span>{" "}
													<span className="font-bold text-black">₹{auction.winningBid}</span>
												</p>
												<p className="mb-4 text-lg">
													<span className="font-semibold text-gray-700">End Date:</span>{" "}
													<span className="text-gray-600">
														{new Date(auction.endDate).toLocaleString()}
													</span>
												</p>
												<Link
													to={`/auction/${auction.auctionId}`}
													className="inline-flex items-center px-6 py-3 text-white transition-all duration-300 transform rounded-full bg-black hover:bg-gray-800 hover:shadow-md hover:-translate-y-1"
												>
													View Your Auction Item <SearchIcon />
												</Link>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-2xl text-gray-500 animate-pulse text-center">
									No victories yet, but your winning moment is coming soon!
								</p>
							)}

							{/* Pagination for Won Auctions */}
							<div className="flex items-center justify-center mt-6 space-x-4">
								<button
									onClick={() => handlePageChange(currentPageWon - 1, "won")}
									className={`bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentPageWon === 1 ? "opacity-50 cursor-not-allowed" : ""
										}`}
									disabled={currentPageWon === 1}
								>
									Previous
								</button>
								<span className="text-gray-600">
									Page {currentPageWon} of{" "}
									{totalPagesWon === 0 ? 1 : totalPagesWon}
								</span>
								<button
									onClick={() => handlePageChange(currentPageWon + 1, "won")}
									className={`bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition-colors ${currentPageWon === totalPagesWon || totalPagesWon === 0
										? "opacity-50 cursor-not-allowed"
										: ""
										}`}
									disabled={currentPageWon === totalPagesWon || totalPagesWon === 0}
								>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
