# 🎓 CampusTrade — Student-to-Student Marketplace

A modern campus marketplace built **exclusively for Kenyan university students** to buy, sell, and exchange textbooks, electronics, and hostel room essentials — safely within campus grounds.

Built with **Python**, **Django MVT Architecture**, and a clean **Minimalist Dark Aesthetic** designed to feel native to the campus generation.

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
| **Musa Maxwell** | **Team Lead & Core Architecture** | `core_app` | Project foundation, `base.html` layout, global dark styling, home, about, and contact pages. |
| **Mary** | **Backend & Catalog Engineer** | `products_app` | Product data models, category filters, product listings, and search. |
| **Magdalene** | **Auth & Security Engineer** | `accounts_app` | Student registration, session login, logout, and user profile management. |

---

## ✅ Current Features (What's Live)

- 🏠 **Home Page** — Landing page with platform intro and call-to-action
- 📄 **About Page** — Team info and platform mission
- 📬 **Contact Page** — Contact form and campus info
- 🎨 **Global Dark Theme** — Electric lime (`#ccff00`) accents on a deep dark (`#0a0a0a`) background with a subtle grid texture
- 🧱 **Template Inheritance** — All pages share one `base.html` master layout with a sticky navbar and footer

---

## 🔜 Upcoming Features (In Development)

- 📦 **Product Listings** *(Mary — products_app)* — Browse, filter and search items by category: Textbooks, Electronics, Hostel Essentials, Clothing
- 🔐 **Student Accounts** *(Magdalene — accounts_app)* — Register with a `.ac.ke` email, login, logout, and manage your profile
- 🛡️ **Verified Listings** — Student ID verification for high-value item listings
- 💬 **In-platform Messaging** — Safe buyer-seller chat without leaving the platform
- 📱 **Mobile Responsive Design** — Optimised for Android phones (the primary campus device)

---

## 🛠️ Tech Stack & System Architecture

| Layer | Technology |
|---|---|
| **Backend** | Python 3.9+, Django 4.x (MVT — Model View Template) |
| **Database** | SQLite3 (development) → PostgreSQL (production) |
| **Frontend** | Semantic HTML5, Vanilla CSS3 (Custom dark theme, no frameworks) |
| **Version Control** | Git & GitHub (branch-per-feature + Pull Request workflow) |
| **Deployment** *(planned)* | Railway / Render (free tier for student projects) |

---

## 🚀 Getting Started (Local Setup Guide)

Follow these steps to run CampusTrade on your machine.

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

### 5. Start the Development Server
```bash
python manage.py runserver
```

Open your browser and go to: **`http://127.0.0.1:8000/`**

---

## 📁 Project Directory Structure

```
campus-trade/
├── .gitignore                   # Excludes venv, sqlite3, and bytecode
├── requirements.txt             # Project dependencies (Django)
├── manage.py                    # Django CLI management script
├── README.md                    # This file
│
├── campustrade/                 # Root configuration package
│   ├── settings.py              # Global settings, INSTALLED_APPS, templates
│   ├── urls.py                  # Master URL routing switchboard
│   └── wsgi.py                  # WSGI web server entry point
│
├── core_app/                    # ✅ DONE — Homepage, About, Contact & static pages
│   ├── views.py                 # View functions for core pages
│   └── urls.py                  # URL routes for core pages
│
├── products_app/                # 🔜 IN PROGRESS — Product catalogue and listings
│   ├── models.py                # Product schema (Mary)
│   ├── views.py
│   └── urls.py
│
├── accounts_app/                # 🔜 IN PROGRESS — User authentication & accounts
│   ├── views.py                 # Register, login, logout (Magdalene)
│   └── urls.py
│
├── static/                      # Static assets (CSS, images)
│   ├── css/
│   │   └── style.css            # Global dark-mode stylesheet (CSS variables + grid)
│   └── images/                  # Media & brand assets
│
└── templates/                   # HTML Templates (Django Template Language)
    ├── base.html                # ✅ Master layout — all pages extend this
    ├── core/                    # Core app templates (index, about, contact)
    ├── products/                # Product app templates (product_list, product_detail)
    └── accounts/                # Auth templates (register, login)
```

---

## 🎨 Design System

All styling must follow the established design tokens defined in `static/css/style.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg-dark` | `#0a0a0a` | Page background |
| `--bg-card` | `#111111` | Cards, navbars, footers |
| `--accent-lime` | `#ccff00` | Primary buttons, links, highlights |
| `--text-primary` | `#ffffff` | Headings and body text |
| `--text-muted` | `#888888` | Subtitles, placeholders |
| `--border` | `#222222` | Dividers and card borders |

> **Rule:** No new CSS files should be created for individual pages. All shared styles go into `style.css`. Page-specific styles use a `<style>` block inside the `{% block content %}` of that page's template.

---

## 🧩 Template Inheritance — How It Works

Every page in CampusTrade **must** extend the `base.html` master layout. This keeps the navbar and footer consistent across all pages.

**Correct template structure for any new page:**
```html
{% extends 'base.html' %}
{% load static %}

{% block title %}Your Page Title — CampusTrade{% endblock %}

{% block content %}
  <!-- Your unique page content goes here -->
  <section class="your-section">
    <h1>Your Heading</h1>
  </section>
{% endblock %}
```

**Never** copy the full HTML structure into a new template. Always extend `base.html`.

---

## 🌿 Git Branching & Team Contribution Guidelines

To keep the `main` branch production-ready at all times, all contributors follow these rules:

### Branch Naming Convention
| Task Type | Branch Name Format | Example |
|---|---|---|
| New feature | `feature-<name>` | `feature-products` |
| Bug fix | `fix-<what>` | `fix-nav-overlap` |
| Styling update | `style-<what>` | `style-card-layout` |
| Documentation | `docs-<what>` | `docs-update-readme` |

### Step-by-Step Contribution Flow

**Step 1 — Always start from an updated main:**
```bash
git checkout main
git pull origin main
```

**Step 2 — Create your feature branch:**
```bash
git checkout -b feature-your-feature-name
```

**Step 3 — Do your work, then stage and commit:**
```bash
git add .
git commit -m "feat: describe what you built"
```

**Step 4 — Push your branch to GitHub:**
```bash
git push -u origin feature-your-feature-name
```

**Step 5 — Open a Pull Request on GitHub:**
- Go to `https://github.com/musaCODEzz/campus-trade`
- Click **"Compare & pull request"**
- Write a clear description of what you built
- Assign **Musa Maxwell** as reviewer

**Step 6 — Wait for Lead Review → Merge**

> ⚠️ **Never push directly to `main`.** Every change goes through a Pull Request.

---

## 🚫 What NOT to Commit

The `.gitignore` already excludes these — but as a reminder, **never** manually add these to your commits:

- `venv/` — your virtual environment (each developer sets up their own)
- `db.sqlite3` — your local database
- `__pycache__/` — Python bytecode cache
- `.env` — environment variables and secret keys

---

## 📌 Commit Message Convention

Use the **Conventional Commits** format for clean, readable git history:

| Prefix | When to use |
|---|---|
| `feat:` | Adding a new feature |
| `fix:` | Fixing a bug |
| `style:` | CSS or visual changes (no logic change) |
| `docs:` | Updating README or documentation only |
| `refactor:` | Restructuring code without changing behavior |
| `chore:` | Config changes, dependency updates |

**Examples:**
```
feat: implement product list view with category filter
fix: correct navbar link on mobile screens
style: update card hover effect to use lime accent
docs: add template inheritance instructions to README
```

---

## 🤝 Contributing

This is a group academic project by eMobilis students. If you are a team member:

1. Read this README fully before writing any code.
2. Set up the project locally using the steps above.
3. Only work inside your assigned app (`products_app` or `accounts_app`).
4. Follow the design system — do not introduce new colors or fonts.
5. Open a PR when done — do not merge your own PR.

---

*CampusTrade — eMobilis Fullstack Development Bootcamp Project, 2026*  
*Team: Musa Maxwell · Mary · Magdalene*
