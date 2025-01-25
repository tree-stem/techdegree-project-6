const express = require('express');

var app = express();

const { projects } = require('./data.json');

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    res.render('project', { projects });
    const { id } = req.params;
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});