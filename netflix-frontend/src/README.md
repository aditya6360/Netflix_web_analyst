# 🎬 Netflix Analytics Dashboard

A full-stack data analytics dashboard built with **FastAPI** (Python) and **React.js**, analyzing 8,807+ Netflix titles from Kaggle.

## 📊 Features
- **Overview** — Total content, Movies vs TV Shows (Pie Chart)
- **Genres** — Top 10 genres by content count (Bar Chart)
- **Years** — Content growth trend 2000–2021 (Line Chart)
- **Countries** — Top 10 producing countries (Bar Chart)
- **Ratings** — Content distribution by rating (Pie Chart)
- **Directors** — Top 10 most prolific directors (Horizontal Bar Chart)

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | Python, FastAPI, Pandas |
| Frontend | React.js, Vite, Recharts |
| Data | Kaggle Netflix Dataset (8,807 records) |
| Tools | Git, GitHub, VS Code, Postman |

## 🔧 Setup & Run

### Backend
```bash
pip install fastapi uvicorn pandas
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd netflix-frontend
npm install
npm run dev
```

## 📈 Key Insights
- 🇺🇸 **USA** leads with 3,689 titles
- 🇮🇳 **India** is #2 with 1,046 titles
- 🎭 **International Movies** is the top genre (2,752)
- 📅 **2018** was the peak year (1,147 titles)
- 🔞 **TV-MA** is the most common rating (38%)
- 🎬 **Rajiv Chilaka** is the top director (19 titles)

## 👨‍💻 Author
**Aditya Kumar** — Full Stack Data Analyst
[![GitHub](https://img.shields.io/badge/GitHub-aditya6360-black)](https://github.com/aditya6360)