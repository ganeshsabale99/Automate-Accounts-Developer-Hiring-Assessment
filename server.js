const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/uploadRoutes'));
app.use('/api', require('./routes/processRoutes'));
app.use('/api', require('./routes/receiptRoutes'));
app.use('/api', require('./routes/validateRoutes'));
const deleteRoutes = require("./routes/deleteRoutes");
app.use("/api/delete", deleteRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
