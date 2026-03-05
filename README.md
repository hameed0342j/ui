<div align="center">

# ☁️ CloudZoo — Inventory Reorder Prediction

**Smart textile inventory management with real-time variance tracking & industry insights**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-ui--gamma--coral.vercel.app-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://ui-gamma-coral.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 🎯 What is CloudZoo?

CloudZoo is an **industrial automation platform** for textile manufacturers in Tiruppur, Tamil Nadu. It helps track raw material consumption, predict reorder points, and visualize cost variances — all from one clean dashboard.

> Built for the fast-paced textile industry where every meter of fabric and spool of thread counts.

---

## ✨ Features

### 📊 Dashboard
- Real-time overview of all orders & inventory status
- Net variance tracking (over/under budget at a glance)
- Reorder alerts for items below minimum stock threshold

### 📋 BOM Input
- Bill of Materials entry with planned quantities & rates
- Support for multiple units: kg, spools, pcs, litres, metres

### 📦 Consumption Tracking
- Log actual consumption against planned BOM
- Automatic variance calculation per item

### 📈 Variance Report
- Side-by-side planned vs actual comparison
- Color-coded loss/saving indicators
- Per-item and per-order cost analysis

### 📁 Order Summary
- Multi-order management (In Progress / Completed)
- Per-order item breakdown with full cost details

### 📑 Industry Report Viewer
- **34-page Wazir Advisors T&A Industry Report 2023** integrated directly
- Split-panel layout: category navigation + image gallery
- 9 organized sections covering global & Indian textile markets
- Full-screen lightbox with keyboard navigation (← → Esc)
- Smooth hover effects and fluid transitions

### ⚙️ Settings
- Configurable reorder thresholds and preferences

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | Radix UI + shadcn/ui |
| **Icons** | Custom SVG + Lucide |
| **Animations** | tw-animate-css |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/hameed0342j/ui.git
cd ui

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📂 Project Structure

```
src/
├── app.jsx                          # App shell + routing
├── main.jsx                         # Entry point
├── index.css                        # Tailwind config + theme
├── components/
│   ├── dashboard/dashboard.jsx      # Stats cards & reorder alerts
│   ├── layout/sidebar.jsx           # Navigation sidebar
│   ├── tables/
│   │   ├── bom-table.jsx            # BOM input table
│   │   ├── consumption-table.jsx    # Actual consumption logging
│   │   └── variance-report.jsx      # Planned vs actual analysis
│   ├── orders/order-summary.jsx     # Order management
│   ├── report/industry-report.jsx   # T&A report viewer
│   ├── settings/settings.jsx        # App settings
│   └── ui/                          # Reusable UI primitives
├── context/inventory-context.jsx    # Global state management
└── lib/
    ├── data.js                      # Mock order data
    ├── calc.js                      # Business logic & calculations
    ├── report-data.js               # Industry report metadata
    └── utils.js                     # Utility functions
```

---

## 🎨 Design Philosophy

- **Warm neutrals** — `#F8F6F3` background, not harsh white
- **Dark sidebar** — `#1A1A2E` for clear navigation hierarchy
- **Minimal borders** — subtle `#E5E2DD` borders for gentle separation
- **Color-coded status** — red for losses, green for savings, amber for warnings
- **Typography** — Inter font family, uppercase tracking for labels

---

## 📊 Industry Report

The integrated report viewer displays the **Wazir Advisors Annual T&A Industry Report 2023** with:

| Section | Pages | Coverage |
|---------|-------|----------|
| Executive Summary | 2 | Global overview & key highlights |
| Global T&A Trade | 5 | World trade flows & major nations |
| Global Fibre & Yarn | 4 | Production & consumption patterns |
| India T&A Industry | 4 | Market size & growth trajectory |
| India Fibre & Yarn | 4 | Cotton & man-made fibre trends |
| India Fabric & Apparel | 4 | Manufacturing & domestic market |
| India T&A Trade | 4 | Exports, imports & trade balance |
| Sustainability & Technical Textiles | 4 | Circular economy & tech textiles |
| Outlook & Recommendations | 3 | Future outlook & strategic priorities |

---

## 🌍 Deployment

This app is deployed on **Vercel** with automatic deployments on push to `main`.

**Live:** [ui-gamma-coral.vercel.app](https://ui-gamma-coral.vercel.app/)

---

## 📄 License

Private project — CloudZoo India Softwares, Tiruppur, Tamil Nadu.

---

<div align="center">

**Built with ❤️ for the Indian textile industry**

*CloudZoo India Softwares · Tiruppur, Tamil Nadu*

</div>
