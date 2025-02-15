const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to handle GitHub Webhooks
app.post("/github-webhook", (req, res) => {
    console.log("GitHub Webhook received:", req.body);
    res.status(200).send("Webhook received!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
