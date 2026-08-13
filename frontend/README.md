# 📊 Currency Analytics Dashboard

A responsive React frontend built with Vite, TypeScript, and Tailwind CSS. It communicates with the backend API to display currency metrics and visualize exchange rates with an interactive bar chart.

## 🛠️ Tech Stack

- **React & TypeScript** - Frontend library & type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first CSS framework
- **Chart.js / react-chartjs-2** - Data visualization
- **Vitest** - Unit testing framework for API utilities

## ⚙️ How to Run

1. Go into the frontend folder:

   ```Bash
   cd frontend
   ```

2. Install dependencies:

   ```Bash
   npm install
   ```

3. Create a `.env` file in the `frontend` root:

   ```Bash
   VITE_API_URL=http://127.0.0.1:8000/analytics
   ```

4. Start the development server:

   ```Bash
   npm run dev
   ```

## 🧪 Running Tests

Run the frontend unit test suite using **Vitest**. The tests verify environment configuration, dynamic URL query parameter construction, error handling, and API response parsing in fetchData.ts:

```
npm run test
```

## ✨ Key Features

- **Currency Selector:** Dynamically filter base currency and target symbols (EUR, USD, GBP, JPY, CHF).
- **Metrics Display:** Highlights strongest/weakest currencies and average exchange rates.
- **Interactive Chart:** Visualizes relative rates with dynamic color highlighting (green for strongest, red for weakest) and auto-scales currencies like JPY.
- **Responsive Layout:** Designed mobile-first for smooth performance on all screen sizes.
