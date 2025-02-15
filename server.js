const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Webhook Endpoint
app.post('/webhook', (req, res) => {
    console.log('🔄 GitHub Webhook Received!', req.body);
    res.status(200).send({ message: "Webhook received!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
