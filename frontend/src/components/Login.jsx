import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { isLoggedIn, login } = useAuth();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/profile");
		}
	}, [isLoggedIn, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(
				"/api/users/login",
				{ email, password },
				{ withCredentials: true }
			);
			if (res.status === 200) {
				login();
				navigate("/profile");
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="flex items-center justify-center min-h-screen bg-gray-100"
			style={{
				backgroundImage:
					"url('https://source.unsplash.com/1600x900/?minimal,white')",
			}}
		>
			<div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
				<h2 className="mb-6 text-3xl font-bold text-black text-center">
					Login
				</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					{/* Email */}
					<div className="flex items-center border rounded-md border-gray-300 bg-white shadow-sm">
						<FiMail className="w-6 h-6 text-gray-500 ml-3" />
						<input
							type="email"
							className="w-full px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black rounded-md"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					{/* Password */}
					<div className="flex items-center border rounded-md border-gray-300 bg-white shadow-sm">
						<FiLock className="w-6 h-6 text-gray-500 ml-3" />
						<input
							type="password"
							className="w-full px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black rounded-md"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					{/* Buttons */}
					<div className="flex items-center justify-between mt-4">
						<p className="text-black">
							Don{"'"}t have an account?{" "}
							<Link
								to="/signup"
								className="text-black font-medium underline hover:text-gray-700"
							>
								Signup
							</Link>
						</p>
						<button
							type="submit"
							className="px-6 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
							disabled={loading}
						>
							{loading ? (
								<AiOutlineLoading3Quarters className="w-6 h-6 animate-spin mx-auto" />
							) : (
								"Login"
							)}
						</button>
					</div>
				</form>

				{/* Error */}
				{error && (
					<div className="mt-4 text-red-500 text-center font-medium">
						{error}
					</div>
				)}
			</div>
		</div>
	);
}

export default Login;
