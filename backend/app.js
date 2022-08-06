const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const acc = process.env.acc;
const pw = process.env.pw;

mongoose.connect(`mongodb+srv://${acc}:${pw}@cluster0.fbxbjuz.mongodb.net/?retryWrites=true&w=majority`,
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .catch(() => console.log('Connexion à MongoDB échouée!'))
;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/post.js');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;