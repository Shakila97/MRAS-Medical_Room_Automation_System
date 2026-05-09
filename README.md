# 🏥 MRAS v3.0 — Intelligent Predictive Health Platform

> **Medical Room Automation System** — Transforming corporate medical facilities from reactive treatment centres into proactive, predictive wellness ecosystems.

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

---

## 📌 Overview

MRAS v3.0 is a full-stack Python-based health platform built for corporate medical rooms. It extends a proven patient records and pharmacy system (MRAS v2) with three breakthrough AI/ML innovations that no existing corporate MRAS product has fully addressed:

| Innovation | Description |
|---|---|
| 🔬 **Multi-Source Predictive Forecasting Engine** | Fuses employee health data, mobile device sensors, and real-time climate APIs to predict illness **3–14 days before symptoms emerge** |
| 🧠 **JRISSI Mental Health Algorithm** | A proprietary Job-Role Intensity and Social Support Index that scores occupational mental health risk — the **first of its kind** in any MRAS worldwide |
| 🔔 **Closed-Loop Smart Notification Engine** | AI-generated, personalised health interventions delivered to employees and doctors, with automated escalation if risk persists |

> **Module:** IT304040 — Software Architecture & Design  
> **Institution:** Faculty of Information Technology, University of Vocational Technology  
> **Version:** v3.0 | **Year:** 2026

---

## 👥 Project Team (Agile Squad)

This project was developed collaboratively over an 8-month sprint using the Agile Scrum framework.

| Name | Student ID | Role |
|---|---|---|
| **L.B. Charith Jeewan** | SIS/24/B2/36 | 🎯 Project Manager / Scrum Master |
| **W.I.L. Withana** | SIS/24/B2/38 | 🏗️ Lead Developer / System Architect |
| **G.B.D. Darsha Anuradha** | SIS/24/B2/15 | ⚙️ Lead Developer (Backend) |
| **B.W.S.S. Nawarathna** | SIS/24/B2/39 | 🎨 Lead Developer (Frontend) |
| **H.K.G.V. Lakmali Koralage** | SIS/24/B2/13 | 🧪 QA & Documentation Specialist |

---

## 🚀 Live Demo

> 🔗 **[https://mras-v3.your-deployment-url.com](https://mras-v3.your-deployment-url.com)**  
> *(Update this link after deployment)*

**Demo credentials:**
| Role | Email | Password |
|---|---|---|
| Doctor | `doctor@demo.mras` | `demo1234` |
| Employee | `employee@demo.mras` | `demo1234` |
| Admin | `admin@demo.mras` | `demo1234` |

---

## 🗂️ Features

### Core Modules (MRAS v2 Foundation)
- **Patient Management** — Employee health profiles, medical history, QR code check-in
- **Consultation Module** — Diagnoses, prescriptions, drug-interaction alerts via OpenFDA API
- **Pharmacy & Inventory** — FEFO stock management, expiry alerts, GRN processing
- **Reporting & Audit** — Management dashboards, audit logs, compliance reports

### v3.0 Intelligence Layer (New)
- **Environmental Disease Forecasting** — Predicts asthma, allergy, and heat-stress episodes per employee based on real-time climate data and their personal medical history
- **JRISSI Scorer** — Computes a 0–100 Mental Health Risk Score from job intensity, social support, physical health trends, and consultation patterns
- **Longitudinal Health Profiling** — Automatically surfaces 3–12 month trends in blood pressure, weight, activity, and mental health across every employee
- **Pre-Visit Doctor Briefing** — AI health summary pushed to the doctor dashboard the moment an employee scans in
- **Behaviour Correction Engine** — Claude API generates personalised, time-bounded health interventions triggered by predictive risk outputs
- **Escalation Monitor** — Automatically alerts the doctor if a High-risk score is sustained for 14+ days without a consultation

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3.12, FastAPI 0.115 (async) |
| **ORM / Models** | SQLModel + SQLAlchemy 2.0 |
| **Database** | PostgreSQL 15 + TimescaleDB |
| **Migrations** | Alembic |
| **ML / Forecasting** | scikit-learn, Facebook Prophet, pandas |
| **LLM Integration** | Anthropic Claude API (`claude-sonnet-4-6`) |
| **Notifications** | Twilio WhatsApp API, SendGrid |
| **Climate Data** | OpenWeatherMap API + Tomorrow.io (fallback) |
| **Scheduler** | APScheduler |
| **Frontend** | React 18 + TypeScript + MUI |
| **Auth** | python-jose, passlib/bcrypt, JWT RBAC |
| **Container** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |
| **Cloud** | AWS ECS Fargate + RDS + S3 |

---

## 📁 Project Structure

```
mras-v3/
├── src/
│   ├── api/                    # FastAPI routers (one per module)
│   │   ├── auth.py
│   │   ├── patients.py
│   │   ├── consultations.py
│   │   ├── inventory.py
│   │   └── intelligence.py     # v3.0 predictions + JRISSI endpoints
│   │
│   ├── modules/                # Domain / business logic
│   │   ├── auth_service.py
│   │   ├── patient_service.py
│   │   ├── jrissi_scorer.py    # MHRS mental health algorithm
│   │   ├── health_forecaster.py
│   │   ├── data_fusion.py      # Merges 3 data streams
│   │   └── notification_engine.py
│   │
│   ├── models/                 # SQLModel table definitions
│   ├── schemas/                # Pydantic request / response types
│   ├── core/
│   │   ├── config.py           # Pydantic BaseSettings (reads .env)
│   │   ├── database.py         # Async DB session
│   │   └── security.py         # JWT helpers, RBAC
│   └── main.py                 # App factory + router registration
│
├── tests/                      # pytest unit + integration tests
├── data/                       # Public datasets (UCI, WHO, OSMI, Kaggle)
├── alembic/                    # Database migrations
├── .github/workflows/          # GitHub Actions CI/CD pipeline
├── docker-compose.yml
├── requirements.txt            # Pinned versions
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.12+
- Docker & Docker Compose
- PostgreSQL 15 (or use the Docker Compose setup)
- Node.js 20+ (for frontend)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/mras-v3.git
cd mras-v3
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/mras_db
SECRET_KEY=your-super-secret-key-here
ANTHROPIC_API_KEY=sk-ant-...
OPENWEATHER_API_KEY=your-key
TOMORROWIO_API_KEY=your-key
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
SENDGRID_API_KEY=your-key
FRONTEND_URL=http://localhost:3000
```

> ⚠️ **Never commit `.env` to Git.** It is already in `.gitignore`.

### 3. Start with Docker Compose

```bash
docker compose up --build
```

This starts:
- FastAPI backend at `http://localhost:8000`
- PostgreSQL + TimescaleDB at port `5432`
- React frontend at `http://localhost:3000`

### 4. Run Database Migrations

```bash
docker compose exec backend alembic upgrade head
```

### 5. Seed with Public Datasets

```bash
docker compose exec backend python scripts/seed_data.py
```

This loads the UCI Heart Disease, Diabetes, Drug Review, WHO Medicines, OSMI Mental Health, and Kaggle Healthcare datasets from the `data/` directory.

### 6. Access the API Docs

FastAPI auto-generates interactive documentation:

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## 🧪 Running Tests

```bash
# Run all tests
docker compose exec backend pytest

# Run with coverage report
docker compose exec backend pytest --cov=src --cov-report=term-missing

# Run a specific module
docker compose exec backend pytest tests/test_jrissi_scorer.py -v

# Type checking
docker compose exec backend mypy src/

# Linting
docker compose exec backend ruff check src/
```

---

## 🔐 Roles & Access Control

| Role | Access |
|---|---|
| `employee` | Own health profile, check-in, daily health log, receive notifications |
| `doctor` | All patient records, JRISSI scores, pre-visit briefings, consultation tools |
| `pharmacy_staff` | Inventory management, FEFO dashboard, GRN processing |
| `admin` | System settings, user management, audit logs (no PHI or JRISSI access) |

> 🔒 **JRISSI mental health scores are visible to `doctor` role only.** This is a hard privacy requirement — they are never exposed to admin, HR, or any other role.

---

## 📊 Public Datasets

All datasets are free, openly licensed, and stored in `data/`:

| Dataset | Source | Records | Used For |
|---|---|---|---|
| Heart Disease (Cleveland) | UCI #45 | 303 | Physical health risk classifier |
| Diabetes 130-US Hospitals | UCI #296 | 101,766 | Longitudinal trend model |
| Drug Reviews (DrugLib) | UCI #461 | 215,063 | Drug-interaction alert engine |
| WHO Essential Medicines List | WHO 2023 | 502 drugs | Inventory module seed |
| OSMI Mental Health in Tech | OSMI 2016–2023 | 4,218 | JRISSI calibration & validation |
| Healthcare Dataset | Kaggle | 10,000 | Patient module seed |
| MoH Sri Lanka Health Stats | MoH LK | Annual | Environmental forecast calibration |

---

## 🚢 Deployment (AWS)

The project deploys to AWS ECS Fargate via GitHub Actions on every push to `main`.

```
GitHub Push → Actions: lint + test + build → ECR image push → ECS deploy → RDS (PostgreSQL)
```

Manual deploy:

```bash
# Build and push to ECR
docker build -t mras-v3 .
docker tag mras-v3:latest <your-ecr-uri>:latest
docker push <your-ecr-uri>:latest

# Force ECS service update
aws ecs update-service --cluster mras-cluster --service mras-service --force-new-deployment
```

---

## 🗺️ Roadmap

| Phase | Duration | Status |
|---|---|---|
| v2 Core (Auth, Patient, Consultation, Pharmacy, Reporting) | Months 1–3 | ✅ Complete |
| Sprint 1 — Data Fusion Layer + Climate API | Month 4 | ✅ Complete |
| Sprint 2 — Physical Health Forecasting Engine | Month 5 | ✅ Complete |
| Sprint 3 — JRISSI Algorithm + Mobile Sensors | Month 6 | ✅ Complete |
| Sprint 4 — Smart Notification Layer + Claude API | Month 7 | 🔄 In Progress |
| UAT, Security Testing & Final Demo | Month 8 | ⏳ Upcoming |

---

## 🤝 Contributing

This is an academic group project. Contributions are managed by the team via feature branches.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit with a descriptive message
git commit -m "feat(jrissi): add SSI sub-score calculation"

# Push and open a PR to main
git push origin feature/your-feature-name
```

**Branch naming convention:**
- `feature/` — new features
- `fix/` — bug fixes
- `test/` — test additions
- `docs/` — documentation updates

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📚 References

Key literature underpinning MRAS v3.0:

- HIMSS. (2025). *Digital Health Most Wired: National Trends 2025.*
- Lee, S. et al. (2025). Wearable-based AI predicts depressive episodes with 91% accuracy. *PMC / Nature Scientific Reports.*
- MDPI Informatics. (2025). Explainable AI for Workplace Mental Health Prediction. `doi:10.3390/informatics12040130`
- BMJ Digital Health. (2024). Closed-loop feedback gap in digital health interventions.
- Duke University Health System. (2024). AI Transcription Reduces Note-Taking Time by 20%.
- SHRM. (2025). *SHRM 2025 Insights: Workplace Mental Health.*

---

<p align="center">
  Built with ❤️ by Group 03 — Faculty of Information Technology, University of Vocational Technology, 2026
</p>