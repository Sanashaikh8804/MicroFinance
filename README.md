📦 Installation & Setup

Follow these steps to get the project running locally.
Prerequisites

    Node.js installed on your machine.

    MongoDB installed locally or a MongoDB Atlas connection string.

1. Backend Setup (Root Directory)

The backend server (Express) is located in the root directory.

    Open your terminal in the root project folder.

    Install the required dependencies:
    Bash

npm install

Create a .env file in the root directory and add your database and port details:
Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string


Start the backend server:
Bash

    npm run dev

    The server should now be running on http://localhost:5000

2. Frontend Setup (Vite)

The React frontend is located in the frontend folder.

    Open a new terminal window.

    Navigate to the frontend directory:
    Bash

cd frontend

Install the frontend dependencies:
Bash

npm install

Start the Vite development server:
Bash

    npm run dev

    Open the link shown in the terminal (usually http://localhost:5173) to view the app.

⚡ Quick Start (Demo Mode)

Once the app is running:

    Go to the Login Page.

    Click "Login as Demo Borrower" or "Login as Demo NBFC" to instantly access the dashboard without registration.


🚀 Project Overview:

A MERN-stack brokerage platform designed to bridge the gap between Small Business Borrowers and NBFCs (Non-Banking Financial Companies). The platform digitizes the micro-finance lifecycle, offering a structured framework for loan schemes, application verification, and final disbursal certification.
💡 Core Workflow

    For NBFCs (Lenders):

        Create Schemes: Define loan categories (e.g., 25-50k), tenure, interest rates, and required documents.

        Application Workbench: Review incoming applications with a 3-step verification process: Document Screening (Approve/Reject individual docs) → Field Visit Report Entry → Final Remarks & Certification.

        Track Portfolio: Monitor active schemes and borrower lists.

    For Borrowers (Entrepreneurs):

        Profile Building: Register with business details (Retail/Wholesale), upload financial proofs (Turnover, ITR), and KYC.

        Marketplace: Browse and apply for loan schemes tailored to their credit criteria.

        Real-Time Tracking: View the status of every uploaded document, field visit reports, and receive the final digital loan certificate.

✨ Key Features

    Role-Based Access: Distinct, secure dashboards for Borrowers and Lenders.

    Granular Verification: NBFCs can approve or reject specific documents, providing clear feedback to borrowers.

    Demo Mode: Pre-configured "One-Click Login" for both Borrower and NBFC roles for rapid prototyping and testing.

🛠 Tech Stack

    Frontend: React.js (Vite), Tailwind CSS

    Backend: Node.js, Express.js

    Database: MongoDB