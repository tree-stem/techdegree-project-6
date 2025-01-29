// inserts express in the app.js file
const express = require('express');

// declares express to a variable named 'app'
var app = express();

// inserts data from the data.json file
const { projects } = require('./data.json');

// sets the view engines to pug
app.set('view engine', 'pug');

// sends users static files from the 'public' folder
app.use(express.static('public'));

// sends a GET request to render the home page
app.get('/', (req, res) => {
    res.render('index', { projects });
});

// sends a GET request to render the about page
app.get('/about', (req, res) => {
    res.render('about');
});

// redirects users to about page when inside a project
app.get('/project/about', (req, res) => {
    res.redirect('/about');
});

// sends a 404 error handler to users for projects that don't exist
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

// set up a 404 error handler for pages not found
app.use((req, res) => {
    console.log("404 error handler called");

    const err = new Error("Page Not Found");
    err.status = 404;

    res.status(404);
    res.locals.error = err;

    res.render('not-found', err);
});

// set up a global server error to catch any other errors
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404);
        res.locals.error = err

        res.render('not-found', err);
    } else {
        console.log("global error handler called");
        const err = new Error();
        err.message = err.message || "Oops! Something went wrong";
        err.status = err.status || 500;

        res.status(err.status || 500);
        res.locals.error = err;
        
        res.render('error', err);
    }
});

// sets up a live server on localhost 3000
app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});