const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/user');
const resetRoutes = require('./routes/reset');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(resetRoutes);

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('db connected');
        app.listen(5000);
    })
    .catch(err => console.log(err));