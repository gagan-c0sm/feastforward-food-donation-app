# FeastForward 🌱

FeastForward is a full-stack web application designed to bridge the gap between food surplus and food scarcity. It connects restaurants and donors with shelters and NGOs, while coordinating volunteer drivers to handle the logistics of food rescue.

This application features a modern, responsive UI built with the **Fresh Harvest** design system, and is fully integrated with a serverless backend.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS (via inline tokens), Lucide Icons, Recharts
- **Backend:** Netlify Serverless Functions (Node.js)
- **Database:** MongoDB Atlas
- **Authentication:** JWT, bcryptjs
- **Deployment:** Netlify

## Features

- **Role-Based Workflows:** Distinct interfaces and capabilities for Donors, Receivers, and Volunteers.
- **Real-Time Dashboards:** Track community impact, deliveries, and matching stats.
- **Commitment Contracts:** Set up recurring donation agreements.
- **Appreciation Forum:** Community rating and review system to build trust.
- **Serverless API:** Robust and scalable backend using Netlify Functions.

## Setup Instructions

### 1. Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (free tier is fine)
- Netlify CLI (`npm install -g netlify-cli`)

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/feastforward
JWT_SECRET=your-super-secret-jwt-key-here
```

*Note: Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.*

### 4. Local Development

Start the development environment using Netlify Dev. This runs both the Vite frontend and the serverless functions locally:

```bash
npm run dev:netlify
```

The application will be available at `http://localhost:8888`.

### 5. Database Seeding

To populate the database with initial test data (users, food posts, transports, etc.), access the seed endpoint once while the local server is running:

Navigate to `http://localhost:8888/.netlify/functions/seed` in your browser.

## Deployment

This project is configured for automated deployment on Netlify.

1. Connect your GitHub repository to Netlify.
2. Ensure the build command is `npm run build` and the publish directory is `dist`.
3. In the Netlify dashboard, navigate to **Site configuration > Environment variables** and add `MONGODB_URI` and `JWT_SECRET`.
4. Deploy the site.
5. Visit the `/api/seed` (or `/.netlify/functions/seed`) endpoint on your live domain once to seed the production database.

---
*Built with ❤️ for a zero-waste community.*