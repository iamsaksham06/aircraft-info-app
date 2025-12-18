## Aircraft Info App

**Aircraft Info App** is a small full‑stack project that lets you fetch **live flight data** from the AviationStack API.  
You can search by **flight status** (active, landed, scheduled, etc.) and optional **departure/arrival IATA codes** to view matching flights.

The project consists of:
- **Backend (`backend/`)**: A simple Express server that proxies requests to the AviationStack API.
- **Frontend (`frontend/`)**: A React app that lets users search and view results.

---

## Features

- **Search flights by status**: active, landed, scheduled, cancelled, incident, diverted.
- **Filter by airports**: optional departure (`dep_iata`) and arrival (`arr_iata`) IATA codes (e.g. `JFK`, `LAX`).
- **Backend proxy** to the AviationStack `/v1/flights` endpoint using Axios.
- **Basic error handling** for invalid subscription/403 errors and generic request failures.

---

## Prerequisites

- **Node.js** (v16+ recommended)
- An **AviationStack API key**

---

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd aircraft-info-app
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with your AviationStack API key:

```bash
AVIATIONSTACK_API_KEY=your_api_key_here
PORT=5000
```

Start the backend server:

```bash
cd backend
node index.js
```

The backend will run on `http://localhost:5000` and expose:

- `GET /api/aviation`
  - Query params:
    - `flight_status` (e.g. `active`, `landed`, `scheduled`, `cancelled`, `incident`, `diverted`)
    - `dep_iata` (optional departure airport IATA)
    - `arr_iata` (optional arrival airport IATA)

### 3. Frontend setup

In a separate terminal:

```bash
cd frontend
npm install
npm start
```

The frontend (Create React App) will start on `http://localhost:3000`.  
The `frontend/package.json` uses a proxy (`"proxy": "http://localhost:5000"`) so API calls to `/api/aviation` are forwarded to the backend.

---

## Usage

1. Make sure the **backend** (`node index.js` in `backend/`) is running.
2. Run the **frontend** (`npm start` in `frontend/`).
3. Open `http://localhost:3000` in your browser.
4. In the UI:
   - Select a **flight status** (default is `active`).
   - Optionally enter **Departure IATA** (e.g. `JFK`).
   - Optionally enter **Arrival IATA** (e.g. `LAX`).
   - Click **Search** to fetch flights.
5. Matching flights will be listed as:  
   `Airline Name - Flight IATA - Flight Status`.

If your AviationStack subscription does not support the request, you’ll see a clear error message in the UI.

---

## Project Structure

- `backend/index.js` – Express server with `/api/aviation` endpoint calling AviationStack.
- `backend/package.json` – Backend dependencies (Express, Axios, dotenv, cors).
- `frontend/src/App.js` – Main React component: search form, API call, and results list.
- `frontend/src/index.js` – React entry point.

---

## Notes & Limitations

- Make sure your **AviationStack plan** supports the `/v1/flights` endpoint and the parameters you’re using.
- Rate limits and data freshness are controlled by AviationStack, not this app.
- This is a minimal demo and does not include authentication, pagination, or advanced error UI.
