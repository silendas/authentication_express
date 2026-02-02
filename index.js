const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db'); 
const apiRouter = require('./routes/index');
const passport = require('passport');
require('./config/passport');

dotenv.config();
connectDB();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));