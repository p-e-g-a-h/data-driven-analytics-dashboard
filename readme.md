# 🪙 Currency Analytics API

A simple REST API built with FastAPI and Pandas. It gets live currency exchange rates from an external API and calculates analytics like the average rate and the strongest/weakest currencies.

## 🛠️ Tech Stack

- **FastAPI** - Backend Web Framework
- **httpx** - For fetching external API data
- **Pandas** - For data calculations
- **python-dotenv** - For environment variables

## ⚙️ How to Run

1. Clone the project and go into the backend folder:

   ```Bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```Bash
   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate

   # Windows
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:

   ```Bash
   pip install fastapi uvicorn httpx pandas python-dotenv
   ```

4. Create a .env file:

   ```env
   API_URL=https://api.frankfurter.dev/v1/latest
   ```

5. Start the server:

   ```Bash
   uvicorn app:app --reload
   ```

## 📌 API Endpoint

`GET /analytics`
Fetches exchange rates and calculates statistics.

- **Query Parameters:**
  - `base` (optional): Base currency code (Default: `USD`)
  - `symbols` (optional): List of target currency codes (Default: `EUR`, `GBP`, `CAD`, `JPY`)
- **Example Request:**
  [http://127.0.0.1:8000/analytics?base=USD&symbols=EUR&symbols=GBP](http://127.0.0.1:8000/analytics?base=USD&symbols=EUR&symbols=GBP)
- **Example Response:**
  ```JSON
    {
        "base_currency": "USD",
        "strongest": {
            "currency": "GBP",
            "rate": 0.74691
        },
        "weakest": {
            "currency": "EUR",
            "rate": 0.87138
        },
        "average_rate": 0.809145,
        "sorted_rates": {
            "GBP": 0.74691,
            "EUR": 0.87138
        }
    }
  ```
