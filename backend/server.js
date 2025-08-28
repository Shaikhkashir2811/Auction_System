const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path"); // <-- ADD THIS LINE

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: process.env.ORIGIN,
		methods: ["GET", "PUT", "POST", "DELETE"],
		credentials: true,
	})
);

// THIS IS THE CRUCIAL FIX. Add this line.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Now you can use app directly for routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auctions", require("./routes/auctionRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
