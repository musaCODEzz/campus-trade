# 🎓 CampusTrade — Student-to-Student Marketplace

A modern campus marketplace built **exclusively for Kenyan university students** to buy, sell, and exchange textbooks, electronics, and hostel room essentials — safely within campus grounds.

Built with **Python**, **Django MVT Architecture**, and a clean **Minimalist Dark Aesthetic** designed to feel native to the campus generation.

> 🌐 **Live Demo:** [https://campus-trade-mtmj.onrender.com/](https://campus-trade-mtmj.onrender.com/)  
> **Tagline:** *Trade smart. Trade safe. Trade campus.*

---

## 🎯 Project Purpose & Problem Statement

Kenyan university students constantly face two painful problems:

1. **Buying** — Textbooks, lab equipment, and hostel room essentials are expensive when bought new. Students need a trusted place to find affordable, used items from fellow students.
2. **Selling** — When semesters end, students have fridges, gas cookers, mattresses, and textbooks they can't take home. They end up selling to bodaboda guys at throwaway prices or leaving items behind.

**CampusTrade solves this** by creating a dedicated, verified, campus-only digital marketplace where students trade with each other — not strangers from the internet.

---

## 👥 The Development Team & Roles

| Developer | Role | Assigned Module | Key Deliverables |
|---|---|---|---|
| **Musa Maxwell** | **Team Lead & Core Architecture** | `core_app` + `products_app` | Foundation, master layout (`base.html`), dark design system, contact model, products catalog, search, and Render deployment. |
| **Mary** | **Backend & Catalog Engineer** | `products_app` | Product data models, category filters, product listings, and search. |
| **Magdalene** | **Auth & Security Engineer** | `accounts_app` | Student registration, session login, logout, and user profile management. |

---

## ✅ Current Features (What's Live)

- 🌐 **Live Cloud Deployment** — Hosted on Render with automated GitHub CI/CD, Gunicorn WSGI server, and WhiteNoise static asset caching.
- 📦 **Campus Marketplace Catalog** — Browse all active student listings with dynamic category filter pills (*Textbooks, Electronics, Hostel, Appliances, Fashion, Other*) and keyword search.
- 🔍 **Product Detail Inspection** — Dedicated item pages with full descriptions, condition badges, electric lime price tags, safe campus trading reminders, and a direct *"Email Seller ✉️"* button.
- 🔐 **Student Authentication** — Full account creation, credential validation, login sessions, and logout with responsive navbar state changes.
- 📬 **Interactive Contact System** — Contact inquiries are validated and saved into the database (`ContactMessage` model) with full Django Admin visibility.
- 🏠 **Home & Info Pages** — Minimalist landing page, mission statement, and campus guidelines.
- 🎨 **Global Dark Theme** — Electric lime (`#ccff00`) accents on a deep dark (`#0a0a0a`) background with subtle grid texture.
- 🧱 **Template Inheritance** — All pages extend a single `base.html` master layout with sticky navigation and footer.

---

## 🔜 Upcoming Features (In Development)

- ➕ **Self-Service Ad Posting** — Web form allowing logged-in students to post new items with category, price, and condition.
- 🏷️ **Seller Dashboard ("My Listings")** — Manage your active campus listings, update prices, or mark items as sold.
- 🛡️ **Verified Student Badges** — Student ID verification for high-value transactions.
- 💬 **In-Platform Direct Messaging** — Safe buyer-seller communication without sharing phone numbers.
- 📱 **PWA / Android Optimization** — Mobile-first optimization for Kenyan campus networks.

---

## 🛠️ Tech Stack & System Architecture

| Layer | Technology |
|---|---|
| **Backend** | Python 3.9+, Django (MVT — Model View Template) |
| **Database** | SQLite3 (development) → PostgreSQL (production) |
| **Frontend** | Semantic HTML5, Vanilla CSS3 (Custom dark theme, CSS Variables) |
| **Static Assets** | WhiteNoise (Compressed & cached in production) |
| **WSGI Server** | Gunicorn |
| **Hosting & CI/CD** | Render (Automatic deployments from GitHub `main` branch) |
| **Version Control** | Git & GitHub (Branch-per-feature + Pull Request code review workflow) |

---

## 🚀 Getting Started (Local Setup Guide)

Follow these steps to run CampusTrade locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/musaCODEzz/campus-trade.git
cd campus-trade
```

### 2. Set Up the Virtual Environment

**On macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows (PowerShell):**
```powershell
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Database Migrations
```bash
python manage.py migrate
```

### 5. Create a Superuser (Optional - for Admin access)
```bash
python manage.py createsuperuser
```

### 6. Start the Development Server
```bash
python manage.py runserver
```

Open your browser and navigate to: **`http://127.0.0.1:8000/`**

---

## 📁 Project Directory Structure

```
campus-trade/
├── .gitignore                   # Excludes venv, sqlite3, and bytecode
├── requirements.txt             # Project dependencies (Django, gunicorn, whitenoise)
├── build.sh                     # Render cloud deployment build script
├── manage.py                    # Django CLI management script
├── README.md                    # Project documentation
│
├── campustrade/                 # Root configuration package
│   ├── settings.py              # Global settings, INSTALLED_APPS, WhiteNoise
│   ├── urls.py                  # Master URL routing switchboard
│   └── wsgi.py                  # WSGI web server entry point
│
├── core_app/                    # ✅ DONE — Home, About, Contact model & admin
│   ├── models.py                # ContactMessage model
│   ├── admin.py                 # Admin registration for inquiries
│   ├── views.py                 # Page views and contact form processing
│   └── urls.py                  # URL routes for core pages
│
├── accounts_app/                # ✅ DONE — User authentication & accounts
│   ├── views.py                 # Register, login, logout view handlers
│   └── urls.py                  # Auth routes (/accounts/register/, /login/, /logout/)
│
├── products_app/                # ✅ DONE — Product catalogue and listings
│   ├── models.py                # Product model with category & condition choices
│   ├── views.py                 # product_list and product_detail view handlers
│   ├── urls.py                  # Routes for marketplace catalog and single items
│   └── admin.py                 # Django admin filters and search fields
│
├── static/                      # Static assets (CSS, images)
│   ├── css/
│   │   └── style.css            # Global dark-mode stylesheet (CSS variables + grid)
│   └── images/                  # Media & brand assets
│
└── templates/                   # HTML Templates (Django Template Language)
    ├── base.html                # ✅ Master layout — all pages extend this
    ├── core/                    # Core templates (index, about, contact)
    ├── accounts/                # Auth templates (register, login)
    └── products/                # Product templates (product_list, product_detail)
```

---

## 🎨 Design System

All styling must follow the established design tokens defined in `static/css/style.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg-dark` | `#0a0a0a` | Page background |
| `--bg-card` | `#111111` | Cards, navbars, footers |
| `--accent-lime` | `#ccff00` | Primary buttons, links, highlights |
| `--accent-lime-hover` | `#b8e600` | Button hover states |
| `--text-primary` | `#ffffff` | Headings and body text |
| `--text-muted` | `#888888` | Subtitles, placeholders |
| `--border` | `#222222` | Dividers and card borders |

---

## 🧩 Template Inheritance — How It Works

Every page in CampusTrade **must** extend the `base.html` master layout. This keeps the navbar and footer consistent across all pages.

**Standard template structure for child templates:**
```html
{% extends 'base.html' %}
{% load static %}

{% block title %}Page Title — CampusTrade{% endblock %}

{% block content %}
  <section class="section-wrapper">
    <h1>Your Content Heading</h1>
  </section>
{% endblock %}
```

---

## 🌿 Git Branching & Team Contribution Guidelines

To keep the `main` branch production-ready and live at all times, all contributors follow these rules:

### Branch Naming Convention
| Task Type | Branch Name Format | Example |
|---|---|---|
| New feature | `feature-<name>` | `feature-post-ad` |
| Bug fix | `fix-<what>` | `fix-nav-overlap` |
| Styling update | `style-<what>` | `style-card-layout` |
| Documentation | `docs-<what>` | `docs-update-readme` |

### Step-by-Step Contribution Flow

1. **Pull latest `main`:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create your feature branch:**
   ```bash
   git checkout -b feature-your-task-name
   ```
3. **Stage and commit changes:**
   ```bash
   git add .
   git commit -m "feat: describe what you built"
   ```
4. **Push branch to GitHub:**
   ```bash
   git push -u origin feature-your-task-name
   ```
5. **Open a Pull Request on GitHub:**
   - Go to `https://github.com/musaCODEzz/campus-trade`
   - Open PR targeting `main`
   - Assign **Musa Maxwell** as reviewer
6. **Lead Review & Merge:**
   - Once merged, Render automatically updates the live website!

---

## 🚫 What NOT to Commit

- `venv/` — local virtual environment
- `db.sqlite3` — local development database
- `__pycache__/` — Python bytecode cache
- `.env` — sensitive environment variables

---

## 🤝 Contributing

This is a group academic project by eMobilis students. If you are a team member:

1. Read this README before writing any code.
2. Only work inside your assigned module.
3. Follow the design system in `style.css`.
4. Open a PR for review — never push directly to `main`.

---

*CampusTrade — eMobilis Fullstack Development Bootcamp Project, 2026*  
*Team: Musa Maxwell · Mary · Magdalene*
