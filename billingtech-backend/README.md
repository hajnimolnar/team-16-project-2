# 📦 BillingTech Backend

This is the backend prototype for the **Invoice Management Application** built during the 2025 EEP Cohort. It allows users to:

- View invoices and line items
- Submit change requests for line items
- Request full refunds for invoices

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-ORG-HERE/billingtech-backend.git
cd billingtech-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Ensure `sqlite3` is installed, then:

```bash
mkdir -p db
sqlite3 db/invoices.db < db/schema.sql
sqlite3 db/invoices.db < db/seed.sql
```

This will create and populate `invoices.db` with sample data.

### 4. Run the server

```bash
node app.js
```

> The API will be available at `http://localhost:3000`

---

## 🧪 API Endpoints

| Method | Endpoint                                  | Description                        |
|--------|-------------------------------------------|------------------------------------|
| GET    | `/api/invoices`                           | Get all invoices                   |
| GET    | `/api/invoices/:id`                       | Get invoice with line items        |
| POST   | `/api/change_requests`                    | Submit a change request            |
| POST   | `/api/refund_requests`                    | Submit a refund request            |

### Example Change Request

```json
{
  "line_item_id": 1,
  "user_id": 1,
  "request_description": "Update quantity to 2"
}
```

### Example Refund Request

```json
{
  "invoice_id": 1,
  "user_id": 1,
  "request_description": "Requesting full refund for double billing"
}
```

---

## 🛠 Project Structure

```
billingtech-backend/
├── app.js                 # Main Express app
├── db.js                  # SQLite DB connector
├── db/
│   ├── schema.sql         # Table creation
│   ├── seed.sql           # Sample data
│   └── invoices.db        # SQLite database
├── routes/
│   ├── invoices.js        # Invoice endpoints
│   ├── changeRequests.js  # Change request endpoint
│   └── refundRequests.js  # Refund request endpoint
```

---

## 📚 Useful Tools

- [SQLite Viewer for VS Code](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) — to inspect the database visually
- [Postman](https://www.postman.com/) — to test the API endpoints

---

## 👥 Authors

- Bertalan Kis
- Team 16 @ 2025 EEP Cohort
