# 🎓 CampusTrade — Student-to-Student Marketplace

A modern, decentralized campus marketplace built exclusively for university students to buy, sell, and exchange textbooks, electronics, and hostel room essentials safely within campus grounds.

Built with **Python**, **Django MVT Architecture**, and a clean **Minimalist Dark Aesthetic**.

---

## 👥 The Development Team & Roles

| Developer | Role | Assigned Module | Key Deliverables |
|---|---|---|---|
| **Musa Maxwell** | **Team Lead & Core Architecture** | `core_app` | Project foundation, `base.html` layout, global dark styling, home, about, and contact pages. |
| **Brian** | **Backend & Catalog Engineer** | `products_app` | Product data models, category filters, product listings, and search. |
| **Stacy** | **Auth & Security Engineer** | `accounts_app` | Student registration, session login, logout, and user profile management. |

---

## 🛠️ Tech Stack & System Architecture

- **Backend:** Python 3.9+, Django (MVT — Model View Template)
- **Database:** SQLite3 (Local development)
- **Frontend:** Semantic HTML5, Vanilla CSS3 (Custom Dark Theme with Grid Texture & Electric Lime Accents)
- **Version Control:** Git & GitHub (Branch-per-feature workflow with Pull Request Code Reviews)

---

## 🚀 Getting Started (Local Setup Guide)

Follow these instructions to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/musaCODEzz/campus-trade.git
cd campus-trade
```

### 2. Set Up the Virtual Environment

* **On macOS / Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

* **On Windows (PowerShell):**
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

Open your browser and navigate to: **`http://127.0.0.1:8000/`**

---

## 📁 Project Directory Structure

```
campus-trade/
├── .gitignore                   # Excludes venv, sqlite3, and bytecode
├── requirements.txt             # Project dependencies (Django)
├── manage.py                    # Django CLI management script
├── README.md                    # Project documentation
│
├── campustrade/                 # Root configuration package
│   ├── settings.py              # Global settings, INSTALLED_APPS, templates
│   ├── urls.py                  # Master routing switchboard
│   └── wsgi.py                  # WSGI web server entry point
│
├── core_app/                    # Homepage, About, Contact & static pages
│   ├── views.py
│   └── urls.py
│
├── products_app/                # Product catalogue and listings
│   ├── models.py                # Product schema
│   ├── views.py
│   └── urls.py
│
├── accounts_app/                # User authentication & accounts
│   ├── views.py
│   └── urls.py
│
├── static/                      # Static assets
│   ├── css/
│   │   └── style.css            # Global dark-mode stylesheet
│   └── images/                  # Media & brand assets
│
└── templates/                   # HTML Templates (Django Template Language)
    ├── base.html                # Master layout (Navbar, footer, layout shell)
    ├── core/                    # Core app templates
    ├── products/                # Product app templates
    └── accounts/                # Authentication templates
```

---

## 🌿 Git Branching & Team Contribution Guidelines

To keep the `main` branch production-ready at all times, all contributors follow these rules:

1. **Never commit directly to `main`**.
2. **Create a feature branch for every task**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature-<feature-name>
   ```
3. **Commit with clean, conventional messages**:
   ```bash
   git commit -m "feat: implement product model and list view"
   ```
4. **Push branch and open a Pull Request (PR)**:
   ```bash
   git push -u origin feature-<feature-name>
   ```
5. **Team Lead Code Review**: At least one review is required before merging into `main`.

