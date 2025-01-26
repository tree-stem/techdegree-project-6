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
    const { id } = req.params;
    const text = projects[id]
    console.log('Project data:', text);
    res.render('project', text);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});