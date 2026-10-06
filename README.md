# 🎉 Auction Bidding System

Welcome to the **Auction Bidding System**! This MERN application is designed to manage auctions, bids, and users.

#### It features:

-   **Backend**: Built with **Node.js** and **Express**.
-   **Frontend**: Developed using **React** with **Vite** for the build tool.
-   **Styling**: Styled with **Tailwind CSS**.
-   **Database**: Uses **MongoDB** for data storage.
-   **Authentication**: Managed with **JWT** (JSON Web Tokens).
-   **Password Security**: Handled with **bcrypt** for hashing passwords.

## 📂 Directory Structure

```plaintext
project/
├── backend/
│   ├── config/
│   │   └── db.js            # Database configuration and connection setup
│   ├── controllers/
│   │   ├── auctionController.js  # Business logic for auction management
│   │   ├── bidController.js      # Business logic for bid management
│   │   └── userController.js     # Business logic for user management
│   ├── middleware/
│   │   └── authMiddleware.js     # Middleware for authentication
│   ├── models/
│   │   ├── AuctionItem.js        # Mongoose schema for auction items
│   │   ├── Bid.js                # Mongoose schema for bids
│   │   └── User.js               # Mongoose schema for users
│   ├── routes/
│   │   ├── auctionRoutes.js      # API routes for auction-related requests
│   │   ├── bidRoutes.js          # API routes for bid-related requests
│   │   └── userRoutes.js         # API routes for user-related requests
│   └── server.js                 # Entry point for the backend server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuctionItem.jsx   # Component for displaying auction items
│   │   │   ├── BidForm.jsx       # Component for submitting bids
│   │   │   ├── Home.jsx          # Home page component
│   │   │   ├── NavBar.jsx        # Navigation bar component
│   │   │   └── Signup.jsx        # Component for user registration
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx   # Context for managing authentication state
│   │   ├── App.jsx               # Main application component
│   │   ├── index.jsx             # Entry point for the React app
│   │   └── main.jsx              # Renders the React app
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── vite.config.js            # Vite configuration for the frontend build
│   └── index.html                # Main HTML file for the frontend
└── README.md                     # This file
```

## 🏗️ Main Directories and Files

### Backend (`backend/`)

-   **`config/`**: Contains configuration files such as `db.js` for setting up the database connection.
-   **`controllers/`**: Implements business logic for different aspects of the application:
    -   `auctionController.js`: Handles auction-related operations.
    -   `bidController.js`: Manages bid-related logic.
    -   `userController.js`: Manages user-related logic.
-   **`middleware/`**: Includes middleware functions like `authMiddleware.js` for authentication and authorization.
-   **`models/`**: Defines data models using Mongoose:
    -   `AuctionItem.js`: Schema for auction items.
    -   `Bid.js`: Schema for bids.
    -   `User.js`: Schema for users.
-   **`routes/`**: Defines API routes:
    -   `auctionRoutes.js`: Routes for auction-related API endpoints.
    -   `bidRoutes.js`: Routes for bid-related API endpoints.
    -   `userRoutes.js`: Routes for user-related API endpoints.
-   **`server.js`**: Entry point for starting the backend server and connecting to the database.

### Frontend (`frontend/`)

-   **`src/`**: Source code for the React application:
    -   **`components/`**: Contains React components for various parts of the UI.
        -   `AuctionItem.jsx`: Displays auction items.
        -   `BidForm.jsx`: Form for placing bids.
        -   `Home.jsx`: Home page component.
        -   `NavBar.jsx`: Navigation bar component.
        -   `Signup.jsx`: User registration component.
    -   **`contexts/`**: Contains context providers like `AuthContext.jsx` for managing user authentication state.
    -   **`App.jsx`**: Main component that sets up routing and the overall layout of the application.
    -   **`index.jsx`**: Entry point that renders `App.jsx`.
    -   **`main.jsx`**: Initializes the React application.
-   **`tailwind.config.js`**: Configuration file for Tailwind CSS styling.
-   **`vite.config.js`**: Configuration file for Vite, used for frontend build and development.
-   **`index.html`**: Main HTML file that serves as the entry point for the frontend application.

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v14 or later)
-   **npm** (v6 or later) or **yarn**

### Installation

#### Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `backend` directory with the following content:
        ```plaintext
        PORT=5000
        MONGODB_URI=your_mongo_uri
        JWT_SECRET=your_jwt_secret
        ORIGIN=http://localhost:5173 or url of frontend
        ```

#### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `frontend` directory with the following content:
        ```plaintext
        TARGET=http://localhost:5000 or url of backend
        ```

## 🏃‍♂️ Running the Project

### Backend

1. Start the backend server:

    ```bash
    npm run dev
    ```

    The backend will run on [http://localhost:5000](http://localhost:5000).

### Frontend

1. Start the frontend development server:

    ```bash
    npm run dev
    ```

    The frontend will run on [http://localhost:5173](http://localhost:5173).

<img width="973" height="601" alt="bid6" src="https://github.com/user-attachments/assets/377fc201-cd98-414e-988b-e8278dbb8970" />

<img width="1313" height="562" alt="bid5" src="https://github.com/user-attachments/assets/d9856b39-134c-4521-a9d2-e598e4042de7" />
<img width="1351" height="554" alt="bid1" src="https://github.com/user-attachments/assets/23525fcb-63f8-41f3-9828-790ba4e52850" />
<img width="527" height="417" alt="bid2" src="https://github.com/user-attachments/assets/5a9e7643-c021-485c-8981-955f31dbbcb9" />
<img width="459" height="319" alt="bid3" src="https://github.com/user-attachments/assets/ae45b541-5b98-4795-8675-a8fbf05851e0" />
<img width="1350" height="587" alt="bid4" src="https://github.com/user-attachments/assets/f9e32f1e-030a-4bc3-a711-9ec78940ee32" />


