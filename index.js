const express = require('express');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db'); 
const { protect } = require('./middlewares/middleware');
const dotenv = require('dotenv');
const passport = require('passport');
require('./config/passport');

const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const contentRoute = require('./routes/contentRoute');

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api', authRoute);
app.use('/admin', adminRoute);

app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

app.use('/dashboard', protect, contentRoute);

app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));