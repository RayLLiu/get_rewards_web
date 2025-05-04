# RewardsPlus - Customer Loyalty Program

A modern web application for managing customer rewards and loyalty programs. Built with React, Vite, and Tailwind CSS.


<img width="1407" alt="Screenshot 2025-05-04 at 1 52 18 PM" src="https://github.com/user-attachments/assets/b88a9aa8-4d2b-437f-994a-3902fcb14bd3" />

## Features

- 🎯 User Authentication (Sign up, Login, Logout)
- 💰 Points Management
- 🎁 Rewards Redemption
- 📊 Activity Tracking
- 📱 Responsive Design
- 🔒 Secure API Integration

## Tech Stack

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - React Router
  - Lucide Icons

- **Backend:**
  - RESTful API
  - JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/raylliu/getrewards_web.git
cd rewardsplus
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── authenticated/     # Components for authenticated users
│   └── legoPiece/        # Reusable UI components
├── App.jsx               # Main application component
└── main.jsx             # Application entry point
```

## Key Components

- **Authentication**
  - Sign up
  - Login
  - Logout
  - Protected routes

- **User Dashboard**
  - Points balance
  - Available rewards
  - Activity history

- **Rewards Management**
  - Browse rewards
  - Redeem points
  - Filter by category

## API Endpoints

- `/users/signup` - User registration
- `/users/login` - User authentication
- `/users/details` - Get user profile
- `/rewards/list` - Get available rewards
- `/redemptions/purchase` - Redeem a reward
- `/earned_points/list` - Get activity history


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
