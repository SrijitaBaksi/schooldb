# 🏫 SchoolDB API

A Node.js + Express REST API for managing schools, including features to:

- Add a school with name, address, and geolocation.
- List schools sorted by distance from a given latitude & longitude.

This project uses **PostgreSQL** as the database and is hosted entirely on **Render** (both backend and database).

---

## 🚀 Features
- **Add School**: Store a new school with name, address, latitude, and longitude.
- **List Schools by Distance**: Get a list of all schools sorted by nearest first.
- **PostgreSQL on Render**: Fully online database hosting — no local DB needed.
- **Environment Variables**: Secure database credentials using `.env`.
- **REST API**: Simple endpoints to integrate with any frontend or service.
- **Deployed Online**: Public API endpoint ready to consume.

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on Render)
- **Hosting**: Render (Backend + Database)
- **Other Tools**: pg (PostgreSQL client for Node.js), dotenv, Postman (for testing)

---

## 📂 Project Structure

```
schooldb/
│
├── server.js # Entry point of the application
├── db.js # Database connection configuration
├── routes/
│ └── school.js # API route handlers
├── .env # Environment variables (DB credentials, port)
├── package.json # Dependencies & scripts
└── README.md # Project documentation

```
---

## 📌 API Endpoints

### 1️⃣ Add School
**POST** `/api/schools/add`

**Body (JSON)**:
```json
{
  "name": "St. Xavier's High School",
  "address": "Park Street, Kolkata",
  "latitude": 22.5726,
  "longitude": 88.3639
}
```
**Response**:
```
{
  "message": "School added successfully",
  "data": {
        "id": 4,
        "name": "St Pauls School",
        "address": "Kolkata",
        "latitude": -20.0522,
        "longitude": 78.2437
    }
}
```
### 2️⃣ List Schools by Distance
**GET** `/api/schools?latitude=22.5726&longitude=88.3639`
**Response**:
```
[
  {
    "id": 1,
    "name": "St. Xavier's High School",
    "address": "Park Street, Kolkata",
    "latitude": 22.5726,
    "longitude": 88.3639,
    "distance_km": 0
  }
]
```
---
## Deployed API (Render)
- Base URL: https://schooldb-lynj.onrender.com
Use this to test the API endpoints in Postman

