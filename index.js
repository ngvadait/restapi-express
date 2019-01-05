let express = require("express");
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

let MovieStore = require('./moviestore');
let movieStore = new MovieStore();

app.get('/', (req, res) => {
    return res.redirect('/movies');
});

app.get('/movies', (req, res) => {
    return res.send(movieStore.all());
});

app.get('/movies/:title', (req, res) => {
    let foundMovies = movieStore.find(req.params.title);

    if (foundMovies.length < 1) {
        res.statusCode = 404;
        return res.send({
            message: 'movie not found'
        })
    }

    return res.send({
        message: 'found movie',
        payload: foundMovies.pop()
    });
});

app.post('/movies', (req, res) => {
    if (!req.body.Title || req.body.Title.trim().length < 1) {
        res.statusCode = 400;
        return res.send({
            message: "missing or invalid title"
        })
    }

    if (movieStore.has(req.body.Title)) {
        res.statusCode = 400;
        return res.send({
            message: "movie already existed"
        })
    }

    movieStore.add(req.body);

    return res.send({
        messageL: "movie added successfully"
    });
});

app.listen(3000, () => {
    console.log('server started at: 127.0.0.1:3000');
});
