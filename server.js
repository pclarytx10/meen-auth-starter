// Dependencies
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Environment Variables
require('dotenv').config();

// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
app.use(methodOverride('_method'));

// Controllers
const userController = require('./controllers/users');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

// Routes

// Index
app.get('/', (req, res) => {
	if (req.session.currentUser) {
		res.render('dashboard.ejs', {
			currentUser: req.session.currentUser
		});
	} else {
		res.render('index.ejs', {
			currentUser: req.session.currentUser
		});
	}
});

// New

// Delete

// Update

// Create

// Edit

// Show

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));