# Task 4 — Basic REST API

A fully functional RESTful API built with **Node.js**, **Express 5**, and **JSON file storage**. Includes a dark-mode Bootstrap 5 dashboard UI for interacting with all endpoints.

## 🔗 Links

- 📄 **API Dashboard (Live Preview):** https://suyog-shirsat2004.github.io/SaiKet-FullStack-Internship/Task-4-Build-a-Basic-REST-API/public/
- ⚡ **API Server:** http://localhost:4000 (requires `npm start`)
- 📮 **Postman Collection:** `Task-4-REST-API.postman_collection.json`

> **Note:** The dashboard UI is a static preview. For full CRUD functionality, run the server locally with `npm start`.

---

## API Endpoints

| Method   | Endpoint                       | Description                                         |
|----------|--------------------------------|-----------------------------------------------------|
| `GET`    | `/api`                         | API info & available endpoints                      |
| `GET`    | `/api/users`                   | List users (supports search, sort, filter, page)   |
| `GET`    | `/api/users/:id`               | Get a single user by ID                             |
| `POST`   | `/api/users`                   | Create a user (`name`, `email`, `age`)              |
| `PUT`    | `/api/users/:id`               | Full update a user                                  |
| `PATCH`  | `/api/users/:id`               | Partial update a user                               |
| `DELETE` | `/api/users/:id`               | Delete a user                                       |
| `DELETE` | `/api/users?confirm=true`      | Delete all users                                    |

### Query Parameters (GET /api/users)

| Param      | Type   | Default     | Description                        |
|------------|--------|-------------|------------------------------------|
| `search`   | string | —           | Search name or email               |
| `sortBy`   | string | `createdAt` | Sort field (`name`, `age`)         |
| `sortOrder`| string | `asc`       | Sort direction (`asc`, `desc`)     |
| `minAge`   | number | —           | Minimum age filter                 |
| `maxAge`   | number | —           | Maximum age filter                 |
| `page`     | number | `1`         | Page number                        |
| `limit`    | number | `10`        | Items per page (max 100)           |

---

## Project Structure

```
Task-4-Build-a-Basic-REST-API/
├── data/
│   └── users.json              # JSON file data store
├── middleware/
│   ├── errorHandler.js         # AppError class + error handler
│   └── validate.js             # Request body validation
├── public/
│   └── index.html              # Dark-mode Bootstrap dashboard UI
├── routes/
│   └── users.js                # All 7 CRUD route handlers
├── server.js                   # Express app entry point
├── package.json
└── Task-4-REST-API.postman_collection.json
```

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Libraries:** cors, morgan, uuid
- **Data Store:** Flat JSON file (`data/users.json`)
- **Dashboard UI:** Bootstrap 5.3 (dark mode), vanilla JS
- **Testing:** Postman collection included

---

## Features

- Full **CRUD** operations for a `User` entity
- **Input validation** (name min 2 chars, valid email, integer age 1–150)
- **Duplicate email** detection (case-insensitive)
- **Search** by name or email
- **Sorting** by name, age, or creation date (asc/desc)
- **Filtering** by age range
- **Pagination** with configurable page size
- **Error handling** with proper HTTP status codes
- **Bootstrap 5 dashboard** with stats, table, modals, and toast notifications

---

## Setup & Run

```bash
# Install dependencies
npm install

# Start the server
npm start

# Server runs at http://localhost:4000
# Dashboard at http://localhost:4000
# API at http://localhost:4000/api
```
