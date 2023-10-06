const express = require('express');
const mongoose = require('mongoose');
const authRoutes  = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine','ejs');

// database connection
const dbURI = 'mongodb+srv://priyanshuk121:authapp123@cluster0.1yzvctd.mongodb.net/node-auth';
mongoose.connect(dbURI)
.then(() => app.listen(3000))
.catch((err) => console.log(err));

//routes
app.get('*', checkUser);
app.get('/', (req,res) => {
    res.render('home');
});

app.get('/smoothies', requireAuth, (req,res) => {
    res.render('smoothies');
});

app.use(authRoutes);