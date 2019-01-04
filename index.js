let express = require("express");
let app = express();

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

app.listen(3000, () => {
    console.log('server started at: 127.0.0.1:3000');
});
