import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AuctionItem.css";

// A simple component for the countdown card for better readability
const CountdownCard = ({ label, value }) => (
	<div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm">
		<div className="text-3xl font-extrabold text-black">
			{value < 10 ? `0${value}` : value}
		</div>
		<div className="mt-1 text-sm font-semibold text-gray-500 uppercase">
			{label}
		</div>
	</div>
);

// A simple component for the bidirectional icons
const ArrowIcon = ({ direction, onClick }) => (
	<button onClick={onClick} className="p-2 transition-transform duration-200 transform rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black">
		{direction === "left" ? (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-6 h-6 text-black"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 19l-7-7 7-7"
				/>
			</svg>
		) : (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-6 h-6 text-black"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 5l7 7-7 7"
				/>
			</svg>
		)}
	</button>
);

const ITEMS_PER_PAGE = 10;

function AuctionItem() {
	const { id } = useParams();
	const [auctionItem, setAuctionItem] = useState(null);
	const [user, setUser] = useState(null);
	const [bids, setBids] = useState([]);
	const [winner, setWinner] = useState("");
	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loadingBids, setLoadingBids] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAuctionItem = async () => {
			try {
				const res = await axios.get(`/api/auctions/${id}`);
				setAuctionItem(res.data);
			} catch (error) {
				console.error("Error fetching auction item:", error);
			}
		};

		const fetchUser = async () => {
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("jwt="))
				?.split("=")[1];
			if (token) {
				try {
					const res = await axios.post(
						"/api/users/profile",
						{},
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					);
					setUser(res.data);
				} catch (error) {
					console.error("Error fetching user profile:", error);
				}
			}
		};

		const fetchWinner = async () => {
			try {
				const res = await axios.get(`/api/auctions/winner/${id}`);
				setWinner(res.data.winner);
			} catch (error) {
				if (error.response.data.winner !== "") {
					console.error("Error fetching auction winner:", error);
				}
			}
		};

		fetchAuctionItem();
		fetchUser();
		fetchWinner();
	}, [id]);

	useEffect(() => {
		const fetchBids = async () => {
			setLoadingBids(true);
			try {
				const res = await axios.get(`/api/bids/${id}`);
				const sortedBids = res.data.sort(
					(a, b) => b.bidAmount - a.bidAmount
				);
				setBids(sortedBids);
				setTotalPages(
					Math.ceil(sortedBids.length / ITEMS_PER_PAGE) || 0
				);
			} catch (error) {
				console.error("Error fetching bids:", error);
			} finally {
				setLoadingBids(false);
			}
		};

		fetchBids();
	}, [id]);

	useEffect(() => {
		const updateCountdown = () => {
			if (auctionItem) {
				const endDate = new Date(auctionItem.endDate);
				const now = new Date();
				const timeDiff = endDate - now;

				if (timeDiff > 0) {
					const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
					const hours = Math.floor(
						(timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					);
					const minutes = Math.floor(
						(timeDiff % (1000 * 60 * 60)) / (1000 * 60)
					);
					const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

					setCountdown({ days, hours, minutes, seconds });
				} else {
					setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				}
			}
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	}, [auctionItem]);

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/auctions/${id}`);
			navigate("/auctions");
		} catch (error) {
			console.error("Error deleting auction item:", error);
		}
	};

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedBids = bids.slice(startIndex, endIndex);

	if (!auctionItem || !user) {
		return <p className="mt-10 text-center text-gray-900">Loading...</p>;
	}

	const highestBid =
		bids.length > 0 ? Math.max(...bids.map((bid) => bid.bidAmount)) : 0;
	const isAuctionEnded =
		countdown.days <= 0 &&
		countdown.hours <= 0 &&
		countdown.minutes <= 0 &&
		countdown.seconds <= 0;

	return (
		<div className="max-w-4xl p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg text-gray-900">
			<h2 className="mb-2 text-4xl font-extrabold">{auctionItem.title}</h2>
			<p className="mb-4 text-gray-600">{auctionItem.description}</p>

			<div className="grid grid-cols-2 gap-4 mb-8">
				<div className="p-4 bg-gray-100 rounded-lg shadow-sm">
					<p className="text-sm text-gray-500 uppercase">Starting Bid</p>
					<span className="text-2xl font-bold">${auctionItem.startingBid}</span>
				</div>
				<div className="p-4 bg-gray-100 rounded-lg shadow-sm">
					<p className="text-sm text-gray-500 uppercase">Current Highest Bid</p>
					<span className="text-2xl font-bold">${highestBid}</span>
				</div>
			</div>

			<div className={`p-6 mb-8 rounded-lg ${isAuctionEnded ? "bg-red-50" : "bg-green-50"}`}>
				<h3 className={`text-2xl font-bold mb-4 ${isAuctionEnded ? "text-red-700" : "text-green-700"}`}>
					{isAuctionEnded ? "Auction Ended" : "Time Remaining"}
				</h3>
				<div className="grid grid-cols-4 gap-4">
					<CountdownCard label="Days" value={countdown.days} />
					<CountdownCard label="Hours" value={countdown.hours} />
					<CountdownCard label="Minutes" value={countdown.minutes} />
					<CountdownCard label="Seconds" value={countdown.seconds} />
				</div>
				{isAuctionEnded && winner && (
					<div className="p-4 mt-6 text-center bg-gray-900 text-white rounded-lg shadow-inner">
						<h3 className="text-xl font-bold">
							Congratulations, {winner.username}!
						</h3>
						<p className="mt-1 text-sm font-semibold text-gray-300">
							You are the winner of this auction!
						</p>
					</div>
				)}
				{isAuctionEnded && !winner && (
					<div className="p-4 mt-6 text-center bg-gray-900 text-white rounded-lg shadow-inner">
						<h3 className="text-xl font-bold">No Winner.</h3>
					</div>
				)}
			</div>

			<h3 className="mb-4 text-2xl font-bold">Bids</h3>
			<div className="min-h-[250px] mb-6">
				{loadingBids ? (
					<p className="text-gray-500">Loading bids...</p>
				) : paginatedBids.length ? (
					<>
						<div className="space-y-4">
							{paginatedBids.map((bid) => (
								<div key={bid._id} className="p-4 bg-gray-100 rounded-lg border border-gray-200">
									<p className="text-lg font-semibold">{bid.userId.username}</p>
									<p className="text-sm text-gray-600">Bid Amount: <span className="font-bold text-black">${bid.bidAmount}</span></p>
								</div>
							))}
						</div>
						<div className="flex items-center justify-center mt-6 space-x-4">
							<ArrowIcon direction="left" onClick={() => handlePageChange(currentPage - 1)} />
							<span className="text-sm text-gray-500">
								Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
							</span>
							<ArrowIcon direction="right" onClick={() => handlePageChange(currentPage + 1)} />
						</div>
					</>
				) : (
					<p className="text-gray-500">No bids have been placed yet.</p>
				)}
			</div>

			<div className="flex justify-center mt-6 space-x-4">
				{auctionItem.createdBy === user.id ? (
					<>
						<Link
							to={`/auction/edit/${id}`}
							className="px-6 py-3 font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200"
						>
							Edit Auction
						</Link>
						<button
							onClick={handleDelete}
							className="px-6 py-3 font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200"
						>
							Delete Auction
						</button>
					</>
				) : (
					!isAuctionEnded && (
						<Link
							to={`/auction/bid/${id}`}
							className="block w-full px-6 py-3 text-center font-bold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200"
						>
							Place a Bid
						</Link>
					)
				)}
			</div>
		</div>
	);
}

export default AuctionItem;