# FeastForward — Food Donation Platform

A role-based food donation web application connecting **donors**, **receivers**, and **volunteer transporters** to reduce food waste and fight hunger. Built with React, TypeScript, and a warm, impact-focused design system.

## Features

### Role-Based Access
- **Donors** — Post food availability, track donation contracts
- **Receivers** — Browse and request available food donations
- **Volunteers** — Sign up for transport assignments between donors and receivers

### Core Modules
- 🔐 **Authentication** — Login/signup with role-based selector cards
- 📋 **Dashboard** — Role-specific stats, recent activity, and quick actions
- 🍽️ **Post Availability** — Donors list food items with quantity, expiry, and location
- 📝 **Request Food** — Receivers browse and request available donations
- 🚚 **Volunteer Transport** — Volunteers manage pickup/delivery logistics
- ⭐ **Appreciation Forum** — Interactive community appreciation board
- 📄 **Contracts** — Track donation agreements between donors and receivers
- 📖 **Guide** — Onboarding and how-to documentation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | TailwindCSS 4 |
| UI Components | Radix UI + Material UI |
| Routing | React Router v7 |
| Animations | Motion (Framer Motion) |
| Notifications | Sonner |
| Icons | Lucide React |

## Design System — "Warm Impact"

The UI uses a curated amber/cream palette with serif typography for a premium, charitable aesthetic:

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#F5A623` | CTAs, active states, accents |
| Background | `#FFF8E7` | Page background |
| Surface | `#F5F2EC` | Cards, inputs |
| Text Primary | `#1A1A1A` | Headings |
| Text Secondary | `#6B6458` | Body text |
| Typography | Playfair Display | Brand headings |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Root router & layout
│   ├── components/
│   │   ├── auth/                  # ProtectedRoute, role guards
│   │   ├── ui/                    # Shared UI components
│   │   ├── post-availability.tsx  # Donor food posting form
│   │   ├── request-food.tsx       # Receiver request interface
│   │   └── volunteer-transport.tsx # Transport management
│   ├── context/
│   │   └── AuthContext.tsx        # Auth state management
│   └── pages/
│       ├── LoginPage.tsx
│       ├── SignupPage.tsx
│       ├── DashboardPage.tsx
│       ├── AppreciationPage.tsx
│       ├── ContractsPage.tsx
│       └── GuidePage.tsx
├── styles/                        # Global CSS
└── main.tsx                       # Entry point
```

## License

MIT