import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
	const { isLoggedIn } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const PrimeBidLogo = () => (
		<div className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 mr-2 text-gray-700"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M12 2L6 8l4 4-6 6 2 2 6-6 4 4 6-6L22 12 12 2zM18 10l-4-4" />
				<path d="M6 18l2 2" />
				<path d="M16 16l-2-2" />
			</svg>
			<span className="text-xl font-bold text-gray-800">PrimeBid</span>
		</div>
	);

	return (
		<nav className="bg-white border-b border-gray-200 shadow-sm relative">
			<div className="container mx-auto px-4">
				{/* Main navbar content */}
				<div className="flex items-center justify-between py-3">
					<Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
						<PrimeBidLogo />
					</Link>

					{/* Desktop Navigation - Hidden on mobile */}
					<div className="hidden lg:flex lg:items-center">
						<ul className="flex space-x-8">
							<li>
								<Link
									className="text-gray-800 hover:text-gray-500 text-lg font-medium transition-colors"
									to="/"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									className="text-gray-800 hover:text-gray-500 text-lg font-medium transition-colors"
									to="/auctions"
								>
									Auctions
								</Link>
							</li>
							{!isLoggedIn && (
								<>
									<li>
										<Link
											className="text-gray-800 hover:text-gray-500 text-lg font-medium transition-colors"
											to="/login"
										>
											Login
										</Link>
									</li>
									<li>
										<Link
											className="bg-white text-black-800 hover:bg-white-100 px-1 py-1 rounded-md font-medium "
											to="/signup"
										>
											Sign Up
										</Link>
									</li>
								</>
							)}
							{isLoggedIn && (
								<>
									<li>
										<Link
											className="text-gray-800 hover:text-gray-500 text-lg font-medium transition-colors"
											to="/profile"
										>
											Profile
										</Link>
									</li>
									<li>
										<Link
											className="text-gray-800 hover:text-gray-500 text-lg font-medium transition-colors"
											to="/logout"
										>
											Logout
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>

					{/* Mobile menu button - Only visible on mobile */}
					<button
						className="lg:hidden text-gray-800 focus:outline-none hover:bg-gray-100 p-2 rounded-md transition-colors"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle navigation menu"
						aria-expanded={isOpen}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							{isOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							)}
						</svg>
					</button>
				</div>

				{/* Mobile Navigation Menu - Collapsible */}
				<div
					className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
						}`}
				>
					<div className="py-3 border-t border-gray-200">
						<ul className="space-y-1">
							<li>
								<Link
									className="block text-gray-800 hover:text-gray-500 hover:bg-gray-50 text-lg font-medium py-3 px-4 rounded-md transition-colors"
									to="/"
									onClick={() => setIsOpen(false)}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									className="block text-gray-800 hover:text-gray-500 hover:bg-gray-50 text-lg font-medium py-3 px-4 rounded-md transition-colors"
									to="/auctions"
									onClick={() => setIsOpen(false)}
								>
									Auctions
								</Link>
							</li>
							{!isLoggedIn && (
								<>
									<li>
										<Link
											className="block text-gray-800 hover:text-gray-500 hover:bg-gray-50 text-lg font-medium py-3 px-4 rounded-md transition-colors"
											to="/login"
											onClick={() => setIsOpen(false)}
										>
											Login
										</Link>
									</li>
									<li>
										<Link
											className="block bg-white text-gray-800 hover:bg-gray-100 mx-4 my-2 px-4 py-3 rounded-md font-medium transition-colors text-center border border-gray-300"
											to="/signup"
											onClick={() => setIsOpen(false)}
										>
											Sign Up
										</Link>
									</li>
								</>
							)}
							{isLoggedIn && (
								<>
									<li>
										<Link
											className="block text-gray-800 hover:text-gray-500 hover:bg-gray-50 text-lg font-medium py-3 px-4 rounded-md transition-colors"
											to="/profile"
											onClick={() => setIsOpen(false)}
										>
											Profile
										</Link>
									</li>
									<li>
										<Link
											className="block text-gray-800 hover:text-gray-500 hover:bg-gray-50 text-lg font-medium py-3 px-4 rounded-md transition-colors"
											to="/logout"
											onClick={() => setIsOpen(false)}
										>
											Logout
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;