const express = require('express');
const connectDB  = require('./db');

const app = express();

//Connect Database
connectDB();

//Init middleware
app.use(express.json({extended: false}));

const PORT = process.env.PORT||5000;

app.get('/', (req, res) => {
    res.send("API running");
});

//Define routes
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/profile', require('./api/profile'));
app.use('/api/posts', require('./api/posts'));

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));