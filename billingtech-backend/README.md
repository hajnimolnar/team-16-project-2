# 📦 BillingTech Backend

This is the backend prototype for the **Invoice Management Application** built during the 2025 EEP Cohort. It allows users to:

- View invoices and line items
- Submit freeform requests for line item changes or full refunds
- Leverage GenAI (mocked) to interpret user text and structure it into actionable requests

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:hajnimolnar/team-16-project-2.git
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

| Method | Endpoint                                  | Description                     |
|--------|-------------------------------------------|---------------------------------|
| GET    | `/api/invoices`                           | Get all invoices                |
| GET    | `/api/invoices/:id`                       | Get invoice with line items     |
| POST   | `/api/requests`                           | Submit a freeform request       |

### Example Request to `/api/requests`

```json
{
  "user_id": 1,
  "invoice_id": 1,
  "description": "Please refund this invoice due to a double charge"
}
```

Mock GenAI will classify and route it to either `change_requests` or `refund_requests`.

---

## 💡 GenAI Integration

GenAI logic is mocked for prototyping purposes via `genai/mockGenAI.js`. It simulates how natural language input would be interpreted in a real AI-enabled system.

To upgrade this later, you can:

- Swap in OpenAI or other LLM API
- Use local LLMs (Ollama, LM Studio)

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
│   └── requests.js        # GenAI-enabled request handler
├── genai/
│   └── mockGenAI.js       # Simulated AI logic
```

---

## 📚 Useful Tools

- [SQLite Viewer for VS Code](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) — to inspect the database visually
- [Postman](https://www.postman.com/) — to test the API endpoints
- [Ollama](https://ollama.com/) (optional) — for local LLM experimentation
