const express = require('express');
const app = express();

const invoicesRouter = require('./routes/invoices');
const changeRequestsRouter = require('./routes/changeRequests');
const refundRequestsRouter = require('./routes/refundRequests');

app.use(express.json());

app.use('/api/invoices', invoicesRouter);
app.use('/api/change_requests', changeRequestsRouter);
app.use('/api/refund_requests', refundRequestsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));