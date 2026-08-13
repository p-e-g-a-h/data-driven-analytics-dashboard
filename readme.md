# 📊 Data-Driven Currency Analytics Dashboard

A full-stack web application featuring an asynchronous **FastAPI** backend for data analysis with **Pandas** and a responsive **React + TypeScript** frontend with **Chart.js** data visualization.

## 📁 Repository Structure

```Plaintext
.
├── backend/
│   ├── app.py           # FastAPI server, endpoints, & Pandas calculations
│   ├── test_app.py      # Pytest suite with AsyncMock testing
│   └── .env             # Environment variables (API_URL)
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── fetchData.ts       # Service layer for API integration
    │   │   └── fetchData.test.ts  # Vitest unit test suite
    │   ├── components/
    │   │   ├── Chart.tsx          # Chart.js bar chart with dynamic coloring
    │   │   └── SelectBaseAndSymbols.tsx # Inputs & currency filter checkboxes
    │   ├── types/
    │   │   └── ApiData.ts         # TypeScript interface for API response
    │   └── App.tsx                # App state, layout, & error banner
    └── .env                       # Environment variables (VITE_API_URL)
```

## 🛠️ Tech Stack

### Backend

- **Python 3.13** – Core programming language.
- **FastAPI** – Modern, high-performance web framework for Python.
- **httpx** – Asynchronous HTTP client to call the external Frankfurter API.
- **Pandas** – Data analysis library used to calculate metrics and sort rates.
- **Pytest** – Testing framework using TestClient and unittest.mock.

### Frontend

- **React 19 & TypeScript** – UI library with strict typing.
- **Vite** – Fast build tool and dev server.
- **Tailwind CSS v4** – Utility-first CSS framework for modern styling.
- **Chart.js / react-chartjs-2** – Data visualization library for interactive charts.
- **Vitest** – Fast unit test runner for frontend JavaScript/TypeScript logic.

## ⚡ Quick Setup & How to Run

### 1. Run the Backend Server

```Bash
cd backend

# Create and activate a virtual environment
python3 -m venv .venv       # On Windows: python -m venv venv
source .venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn httpx pandas python-dotenv pytest

# Create .env file
echo "API_URL=https://api.frankfurter.dev/v1/latest" > .env

# Start FastAPI server (runs on http://127.0.0.1:8000)
uvicorn app:app --reload
```

### 2. Run the Frontend Dashboard

Open a new terminal window:

```Bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://127.0.0.1:8000/analytics" > .env

# Start dev server (runs on http://localhost:5173)
npm run dev
```

## 🧪 Running Unit Tests

### Backend Unit Tests (Pytest)

```
cd backend
pytest -v
```

- **What it tests:** Exercises `/analytics` using `TestClient` and `@patch` mocking without needing live internet access:
  - `200 OK`: Valid currency request & metric calculation.
  - `422 Unprocessable Entity`: Input validation errors (e.g., base currency code > 3 characters).
  - `404 Not Found`: Empty response handling when no rates return.
  - `502 Bad Gateway`: External API connection failure handling.

### Frontend Unit Tests (Vitest)

- **What it tests:** Validates `fetchData.ts` utility:
  - Throws error if `VITE_API_URL` environment variable is missing.
  - Constructs query strings correctly (`?base=USD&symbols=EUR&symbols=GBP`).
  - Catches failed HTTP responses (`res.ok === false`).
  - Correctly parses JSON payloads on success.

## 📡 API Specification

`GET /analytics`
Fetches live exchange rates and computes statistical analytics.

- **Query Parameters:**
  - `base` (string, optional, max 3 chars): Base currency (Default: `USD`).
  - `symbols` (list of strings, optional): Target currencies (Default: `EUR`, `GBP`, `CAD`, `JPY`).

- **Example Request:** [http://127.0.0.1:8000/analytics?base=USD&symbols=EUR&symbols=GBP](http://127.0.0.1:8000/analytics?base=USD&symbols=EUR&symbols=GBP)

- **Example Response (`200 OK`):**

```JSON
{
  "base_currency": "USD",
  "strongest": {
    "currency": "GBP",
    "rate": 0.8
  },
  "weakest": {
    "currency": "JPY",
    "rate": 150.0
  },
  "average_rate": 50.566,
  "sorted_rates": {
    "GBP": 0.8,
    "EUR": 0.9,
    "JPY": 150.0
  }
}
```
