const express = require('express');
const connectDB  = require('./db');

const app = express();

//Connect Database
connectDB();

const PORT = process.env.PORT||5000;

app.get('/', (req, res) => {
    res.send("API running");
});


app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));