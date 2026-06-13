# F.L.O (Folio Portfolio Builder)

F.L.O is a premium, modern developer portfolio builder and publishing platform designed to help developers create, customize, and publish stunning portfolios in minutes.

---

## ✨ Features

- **Interactive Portfolio Builder**: Real-time customization using the `PreviewEditor` component.
- **Dynamic Dashboards**: Manage published sites, custom domains, and view analytics directly through the control center.
- **GitHub Pages Integration**: Automatic generation and deployment of portfolios directly to GitHub repositories.
- **Flexible Templates**: Choose from beautiful, responsive templates tailored for various developer archetypes.
- **Seamless Custom Domains**: Support for injecting `CNAME` files and mapping custom domains dynamically.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with PostCSS
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Backend**: Express Server, [Better SQLite3](https://github.com/WiseLibs/better-sqlite3)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Local Development Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory (refer to `.env.example`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/
   GEMINI_API_KEY="your-gemini-api-key"
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Architecture & Roadmap

- For details about project structure and organization, see [ARCHITECTURE.md](ARCHITECTURE.md).
- To read about publishing mechanisms and future updates, see [ROADMAP.md](ROADMAP.md).

