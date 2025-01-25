const express = require('express');

const data = require('./data.json');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', data.projects);
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    res.render('project', { data });
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});