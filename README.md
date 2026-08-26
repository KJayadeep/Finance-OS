# Finance OS

A full-stack personal finance tracker for managing income, expenses, and spending trends in one clean dashboard.

**Live demo:** [finance-os-nu-flax.vercel.app](https://finance-os-nu-flax.vercel.app)

---

## Overview

Finance OS is a MERN-based web app that helps you track where your money comes from and where it goes. Sign up, log your income and expenses, and get an at-a-glance view of your balance, spending categories, and recent activity — all backed by a secure, cookie-based authentication system.

## Features

- 🔐 **Secure authentication** — JWT-based auth stored in HTTP-only cookies, with signup, login, logout, and session checks
- 💰 **Income & expense tracking** — add, view, and delete income and expense entries with category, description, and date
- 📊 **Dashboard overview** — total balance, total income, and total expenses at a glance
- 📈 **Visual insights** — spending trends and breakdowns via interactive charts
- 🕒 **Transaction history** — a running, filterable log of recent transactions
- 📱 **Responsive UI** — built with Tailwind CSS for a clean experience across devices

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS
- React Router
- Chart.js / react-chartjs-2
- Axios
- React Hot Toast, React Datepicker, Lucide Icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs for password hashing
- cookie-parser, CORS, dotenv

**Deployment**
- Vercel (frontend and backend)

## Project Structure

```
Finance-OS/
├── Backend/
│   ├── config/          # Database connection & utilities
│   ├── controllers/     # Route handlers (auth, income, expense)
│   ├── middleware/      # Auth middleware (JWT verification)
│   ├── models/          # Mongoose schemas (User, Income, Expense)
│   ├── routes/          # API route definitions
│   └── index.js         # App entry point
│
└── Frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── context/     # Global & auth context providers
    │   ├── layouts/      # Page layouts
    │   ├── pages/        # Dashboard, Incomes, Expenses, Login, Signup
    │   └── utils/         # Helper functions
    └── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/KJayadeep/Finance-OS.git
cd Finance-OS
```

### 2. Set up the backend

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../Frontend
npm install
```

Create a `.env` file in `Frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Reference

All transaction routes require authentication (via cookie).

**Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in and receive an auth cookie |
| POST | `/api/auth/logout` | Log out the current user |
| GET | `/api/auth/check-auth` | Verify current session |

**Transactions**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transactions/add-income` | Add a new income entry |
| GET | `/api/transactions/get-incomes` | Get all income entries |
| DELETE | `/api/transactions/delete-income/:id` | Delete an income entry |
| POST | `/api/transactions/add-expense` | Add a new expense entry |
| GET | `/api/transactions/get-expenses` | Get all expense entries |
| DELETE | `/api/transactions/delete-expense/:id` | Delete an expense entry |

## Deployment

Both the frontend and backend are configured for deployment on [Vercel](https://vercel.com) (see `vercel.json` in each directory). Set the corresponding environment variables in your Vercel project settings for each service.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/KJayadeep/Finance-OS/issues) or open a pull request.

## License

This project is currently unlicensed. If you'd like to reuse this code, please reach out to the repository owner.

## Author

**KJayadeep**
[GitHub](https://github.com/KJayadeep)