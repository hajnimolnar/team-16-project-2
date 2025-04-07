const express = require("express");
const app = express();
const invoicesRouter = require("./routes/invoices");
const requestsRouter = require("./routes/requests");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173" })); // Replace with your frontend's URL

app.use(express.json());

app.use("/api/invoices", invoicesRouter);
app.use("/api/requests", requestsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
