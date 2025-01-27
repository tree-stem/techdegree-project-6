const express = require('express');

var app = express();

const { projects } = require('./data.json');

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

// 404 Route Does Not Exist
app.get('/project/:id', (req, res, next) => {
    const id = req.params.id;
    const project = projects[id]

    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error("Sorry, looks like that page does not exist");
        err.status = 404;
        next(err);
    }
});

// 404 Page Not Found
app.use((req, res) => {
    console.log("404 error handler called");
    const err = new Error("Page Not Found");
    err.status = 404;
    res.status(404);
    res.locals.error = err;
    res.render('not-found', err);
});

// 500 General Server Error
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404);
        res.locals.error = err
        res.render('not-found', err);
    } else {
        console.log("global error handler called");
        const err = new Error("Oops! Something went wrong");
        err.status = 500;
        res.status(500);
        res.locals.error = err;
        res.render('error', err);
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});