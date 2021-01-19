const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./pages/blog');
const aboutRoutes = require('./pages/about');

const app = express();

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://omar:admin@omar.9y3wk.mongodb.net/Ninja_Blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		// listen
		app.listen(3000);
	})
	.catch(err =>{
		console.log(err);
	})

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.redirect('/blogs');
});

// BLOG ROUTES
app.use('/blogs', blogRoutes);

// ABOUT ROUTES
app.use('/about', aboutRoutes);

// 404 page
app.use((req, res) => {
	res.status(404).render('404', {title: 'Page Not Found'});
});