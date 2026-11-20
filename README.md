# 🎓 CampusTrade — Student-to-Student Campus Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Django Version](https://img.shields.io/badge/Django-6.1.3-092E20?logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React Version](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![DRF](https://img.shields.io/badge/DRF-REST_Framework-red?logo=django)](https://www.django-rest-framework.org/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![M-Pesa](https://img.shields.io/badge/Daraja-M--Pesa_STK_Push-00A859?logo=safaricom&logoColor=white)](https://developer.safaricom.co.ke/)
[![Live Deployment](https://img.shields.io/badge/Render-Live_Production-46E3B7?logo=render&logoColor=white)](https://campus-trade-mtmj.onrender.com/)

> **A modern, decoupled full-stack campus commerce platform built exclusively for Kenyan university students to buy, sell, and safely exchange textbooks, electronics, and hostel essentials without middleman markups.**

🌐 **Live Backend Deployment:** [https://campus-trade-mtmj.onrender.com/](https://campus-trade-mtmj.onrender.com/)  
👤 **Author & Sole Lead Developer:** **Musa Maxwell** (eMobilis Fullstack Development Program)  
🎨 **Design Aesthetic:** High-contrast Cyber Dark (`#0a0a0a`) with Electric Lime (`#ccff00`) accents  

---

## 📌 Executive Summary & Author Statement

**CampusTrade** was conceived to solve the widespread financial exploitation and safety risks Kenyan university students experience every semester when buying and selling second-hand goods.

> 💡 **Project Ownership Note:**  
> While originally assigned as a group capstone project, **CampusTrade was engineered, designed, and brought to full-stack completion entirely by Musa Maxwell**. After team members failed to deliver their respective modules, Musa assumed 100% ownership across the software development lifecycle (SDLC) — from database modeling, RESTful API architecture, and JWT security to a reactive React.js Single Page Application (SPA), custom CSS design tokens, and M-Pesa Daraja payment integration.

---

## 🎯 The Problem & The Solution

### The Campus Dilemma
Every academic year in Kenyan universities:
1. **Freshers & Continuing Students** pay exorbitant retail prices for textbooks, scientific calculators, laptops, and hostel appliances.
2. **Graduating & Relocating Students** have valuable items they cannot transport home, forcing them to sell to informal brokers or *bodaboda* operators at throwaway prices.
3. **Safety & Fraud:** In-person cash trades pose theft risks, while direct phone-to-phone M-Pesa transactions suffer from **fake SMS confirmation scams** and **instant transaction reversals**.

### The CampusTrade Solution
* **Zero Middleman Markups:** Direct peer-to-peer student trading.
* **Verified Campus Environment:** All listings require registered student credentials.
* **Automated Safety Reminders:** Prescribes safe campus meetup locations (library gates, cafeterias).
* **M-Pesa Daraja STK Escrow Integration:** Eliminates cash and fake SMS scams by validating payments server-to-server before item release.

---

## 🏛️ System Architecture

CampusTrade utilizes a modern **Decoupled Architecture**: a headless Django REST API backend powering a high-speed React.js Single Page Application (SPA).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT APPLICATION                              │
│                                                                        │
│   React 18 SPA (Vite) ─── Port 5173                                    │
│   ├── Client Routing (React Router v6)                                 │
│   ├── Global Dark Mode Design System (CSS3 Custom Properties)          │
│   ├── Centralized Axios Interceptors (Silent JWT Refreshing)           │
│   └── 8 Production Pages: Home, About, Contact, Marketplace,           │
│       Product Detail, Add Listing, Login, Register                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                     HTTPS / JSON REST API Requests
                     Authorization: Bearer <JWT_ACCESS_TOKEN>
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        BACKEND API SERVER                              │
│                                                                        │
│   Django 6.1.3 + Django REST Framework (DRF) ─── Port 8000            │
│   ├── SimpleJWT Stateless Token Engine (Access: 1d, Refresh: 7d)       │
│   ├── CORS Security Gateway (django-cors-headers)                      │
│   ├── Relational Database Engine (SQLite3 Dev / PostgreSQL Prod)       │
│   ├── Static Asset Pipeline (WhiteNoise + Gunicorn WSGI)               │
│   └── Django MVT Heritage (Preserved for Admin & Server-Rendered Demos)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                     Telecom API Handshake (HTTPS)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL INTEGRATIONS                           │
│                                                                        │
│   Safaricom Daraja API Gateway                                         │
│   ├── Inbound STK Push (Lipa Na M-Pesa Online - C2B)                   │
│   ├── Asynchronous Callback Handshake (/api/mpesa/callback/)           │
│   └── Platform Escrow Holding Architecture                             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features & Capabilities

### 1. Modern React SPA Frontend (`frontend/`)
* **⚡ High-Speed Vite Tooling:** Sub-millisecond Hot Module Replacement (HMR).
* **🎨 Signature Dark Theme:** Custom CSS tokens, card hover dynamics, electric lime CTAs (`#ccff00`), and subtle grid canvas.
* **📱 Responsive Multi-Column Layouts:** Dynamic 2-column hero banners, 3-card value propositions, and clean mobile off-canvas menus.
* **🔍 Live Filtering & Catalog Search:** Instant query filtering across 6 campus categories (*Textbooks, Electronics, Hostel, Appliances, Fashion, Other*) with server-side pagination.
* **🛡️ Client-Side Route Guards:** Protected routes (`/products/add`) preventing unauthorized access, redirecting unauthenticated users to `/login`.
* **✉️ Real-Time Communication:** Direct `mailto:` seller links pre-populated with item metadata and inquiry templates.
* **📬 Controlled Contact System:** Controlled React forms dispatching async inquiries directly to the Django database with real-time UI status alerts.

### 2. Django REST Framework Backend (`api/`)
* **🔑 Stateless JWT Authentication:** Custom registration and login endpoints issuing cryptographic token pairs.
* **🔄 Self-Healing Axios Interceptors:** Automatically catches `401 Unauthorized` responses and exchanges the refresh token for a fresh access token without interrupting user experience.
* **📦 Complete Product CRUD:** ModelSerializers with computed read-only properties (`seller`, `seller_email`, `created_at`).
* **🗄️ Relational Integrity:** Cascade deletion protections, foreign key relational mappings, and admin search/filter indexes.

### 3. Safaricom M-Pesa Daraja Integration (Fintech Engine)
* **📱 STK Push (Lipa Na M-Pesa Online):** Generates time-sensitive Base64 encrypted passwords (`Shortcode + Passkey + Timestamp`) and dispatches PIN prompts directly to buyers' mobile handsets.
* **🔐 Escrow Holding Model:** Collects funds into CampusTrade's holding shortcode, holding transactions in an `ESCROW_HOLDING` state until physical item inspection.
* **🛡️ Replay & Fraud Prevention:** Strict database-level price matching (ignoring client-side modified prices) and unique `CheckoutRequestID` callback validation.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Core** | React 18, Vite, JavaScript (ES6+), JSX |
| **Routing & Networking** | React Router DOM v6, Axios (with Interceptors) |
| **Styling & UI** | CSS3 Custom Properties, Bootstrap 5.3, Bootstrap Icons |
| **Backend Core** | Python 3.9+, Django 6.1.3, Django REST Framework (DRF) |
| **Authentication** | JSON Web Tokens (`djangorestframework-simplejwt`) |
| **Database** | SQLite3 (Development) / PostgreSQL (Production) |
| **Fintech API** | Safaricom Daraja API (STK Push, C2B, OAuth 2.0) |
| **Static & WSGI** | WhiteNoise, Gunicorn |
| **Hosting & CI/CD** | Render Cloud, Git, GitHub Actions |

---

## 📡 API Reference & Endpoints

| Method | Endpoint | Description | Auth Required? |
|---|---|---|---|
| `POST` | `/api/auth/register/` | Register a new student account | No |
| `POST` | `/api/auth/login/` | Authenticate user & return JWT Token pair | No |
| `POST` | `/api/auth/token/refresh/` | Exchange refresh token for fresh access token | No |
| `GET` | `/api/auth/user/` | Retrieve current authenticated student profile | **Yes (Bearer Token)** |
| `GET` | `/api/products/` | List all listings (supports `?search=` and `?category=`) | No |
| `POST` | `/api/products/` | Create a new campus listing | **Yes (Bearer Token)** |
| `GET` | `/api/products/<id>/` | Retrieve specific product details | No |
| `PUT` | `/api/products/<id>/` | Update an existing listing | **Yes (Owner only)** |
| `DELETE`| `/api/products/<id>/` | Delete a listing | **Yes (Owner only)** |
| `POST` | `/api/contact/` | Submit a contact message/inquiry | No |
| `POST` | `/api/mpesa/pay/` | Initiate Daraja STK Push to buyer's phone | **Yes (Bearer Token)** |
| `POST` | `/api/mpesa/callback/`| Safaricom webhook receiving async payment outcome | No (Safaricom only) |

---

## 📁 Repository Directory Structure

```
campus-trade/
├── manage.py                     # Django CLI orchestration script
├── requirements.txt              # Production Python dependencies
├── build.sh                      # Render cloud build & migration script
├── README.md                     # Master project documentation
│
├── campustrade/                  # Core Project Configuration
│   ├── settings.py               # Django, DRF, JWT, CORS & WhiteNoise settings
│   ├── urls.py                   # Master URL routing switchboard
│   └── wsgi.py                   # WSGI web server entry point
│
├── accounts_app/                 # Student Authentication Module
│   ├── serializers.py            # User registration & profile serializers
│   ├── views.py                  # JWT Auth & registration viewsets
│   └── urls.py                   # Auth routing (/api/auth/...)
│
├── products_app/                 # Marketplace Core Module
│   ├── models.py                 # Product model (choices for Category & Condition)
│   ├── serializers.py            # ProductSerializer (seller username & email expose)
│   ├── views.py                  # Product list, detail, and CRUD viewsets
│   ├── urls.py                   # Catalog API routing (/api/products/...)
│   └── admin.py                  # Django admin custom filters & search
│
├── core_app/                     # Platform Core & Communications
│   ├── models.py                 # ContactMessage data model
│   ├── views.py                  # MVT views + api_contact DRF endpoint
│   ├── urls.py                   # Core routes (/api/contact/, etc.)
│   └── admin.py                  # Inquiries dashboard
│
├── static/                       # Server-Side Static Assets
│   └── css/style.css             # Heritage stylesheet & tokens
│
├── templates/                    # Server-Side Rendered Templates (Django MVT)
│   ├── base.html                 # Master layout template
│   ├── core/                     # index.html, about.html, contact.html
│   ├── accounts/                 # login.html, register.html
│   └── products/                 # product_list.html, product_detail.html
│
└── frontend/                     # Modern React Single Page Application
    ├── package.json              # Node dependencies (React 18, Vite, Axios)
    ├── vite.config.js            # Vite configuration & dev server proxy
    ├── index.html                # SPA HTML root entry point
    │
    └── src/
        ├── main.jsx              # React DOM mounting & Bootstrap imports
        ├── App.jsx               # Root router, global auth state & route mapping
        ├── index.css             # Global dark design system & CSS variables
        │
        ├── services/
        │   └── api.js            # Axios client, JWT interceptors & service modules
        │
        ├── components/
        │   ├── Navbar.jsx        # Sticky navigation with dynamic auth links
        │   ├── Footer.jsx        # Standardized branding & copyright footer
        │   └── ProductCard.jsx   # Marketplace item card with condition tags
        │
        └── pages/
            ├── Home.jsx          # 5rem hero landing page with feature cards
            ├── About.jsx         # Mission, safety, and circular economy story
            ├── Contact.jsx       # Controlled feedback form with direct API save
            ├── ProductList.jsx   # Live catalog with category pills & search
            ├── ProductDetail.jsx # 2-column view, safety reminder & mailto seller
            ├── AddProduct.jsx    # Protected listing form with route guard
            ├── Login.jsx         # Controlled JWT login with redirect
            └── Register.jsx      # Controlled registration with client validation
```

---

## 🚀 Local Development Setup Guide

Follow this guide to run the complete decoupled stack (Django API + React Vite SPA) locally.

### Prerequisites
* **Python 3.9+** installed
* **Node.js (v18+)** and **npm** installed
* **Git** installed

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/musaCODEzz/campus-trade.git
cd campus-trade
```

---

### Step 2: Set Up Backend (Terminal 1)

1. **Create and activate a virtual environment:**
   ```bash
   # macOS / Linux:
   python3 -m venv venv
   source venv/bin/activate

   # Windows:
   python -m venv venv
   venv\Scripts\activate
   ```

2. **Install backend dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Create a superuser (for Django Admin access):**
   ```bash
   python manage.py createsuperuser
   ```

5. **Start the Django REST API server:**
   ```bash
   python manage.py runserver 8000
   ```
   *Backend is now live at: `http://localhost:8000/`*  
   *Django Admin is accessible at: `http://localhost:8000/admin/`*

---

### Step 3: Set Up Frontend (Terminal 2)

1. **Open a new terminal window and navigate to `frontend/`:**
   ```bash
   cd campus-trade/frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   *Frontend application is now running at: `http://localhost:5173/`*

---

## 🎨 Global Design Tokens

All styling adheres to the following centralized CSS custom properties (`frontend/src/index.css`):

```css
:root {
  --bg-dark: #0a0a0a;          /* Master background */
  --card-bg: #121212;          /* Elevation 1 surface */
  --border-color: #222222;     /* Subtle container dividers */
  --text-primary: #ffffff;     /* High-contrast headers */
  --text-secondary: #999999;   /* Metadata & labels */
  --accent-lime: #ccff00;      /* Primary electric brand action */
  --accent-lime-hover: #b8e600;/* Hover state */
}
```

---

## 🌿 Git Workflow & Engineering Hygiene

All features were developed following strict **trunk-based feature branching**:
* `main` — Strictly production-ready, auto-deployed to cloud.
* `feature-<name>` — Granular branches for isolated development.
* All commits adhere to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `refactor:`, `chore:`).

---

## 📜 License & Acknowledgments

This project is licensed under the **MIT License**.

Developed with passion, resilience, and high engineering standards by **Musa Maxwell** as part of the **eMobilis Fullstack Software Development Program (2026)**.
