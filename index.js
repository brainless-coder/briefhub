const express = require('express');
const mongo  = require('mongodb');

const app = express();


const PORT = process.env.PORT||5000;

app.get('/', (req, res) => {
    res.send("API running");
});


app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));