let express = require("express");
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

let MovieStore = require('./moviestore');
let movieStore = new MovieStore();

function paginate(data, size, page) {
    let index = page - 1;
    return data.slice(index * size, (index + 1) * size);
}

app.get('/', (req, res) => {
    return res.redirect('/movies');
});

app.get('/movies', (req, res) => {

    let movies = movieStore.search(req.query.title);

    let page = parseInt(req.query.page) || 1,
        size = parseInt(req.query.size) || 2;

    let results = paginate(movies, size, page);

    return res.json({
        title: req.query.title,
        totalPage: movies.length,
        page: page,
        size: size,
        payload: results
    });
});

app.get('/movies/:title', (req, res) => {
    let foundMovies = movieStore.find(req.params.title);

    if (foundMovies.length < 1) {
        res.statusCode = 404;
        return res.json({
            message: 'movie not found'
        })
    }

    return res.json({
        message: 'found movie',
        payload: foundMovies.pop()
    });
});

app.put('/movies/:title', (req, res) => {
    if (!movieStore.update(req.params.title, req.body)) {
        res.statusCode = 500;
        return res.json({
            message: "failed to update movie info"
        })
    }

    return res.json({
        message: 'update movie successfully',
    });
});

app.delete('/movies/:title', (req, res) => {
    if (!movieStore.has(req.params.title)) {
        res.statusCode = 404;
        return res.json({
            message: "movie not found"
        })
    }

    movieStore.remove(req.params.title);

    return res.json({
        message: 'delete movie successfully',
    });
});

app.post('/movies', (req, res) => {
    if (!req.body.Title || req.body.Title.trim().length < 1) {
        res.statusCode = 400;
        return res.json({
            message: "missing or invalid title"
        })
    }

    if (movieStore.has(req.body.Title)) {
        res.statusCode = 400;
        return res.json({
            message: "movie already existed"
        })
    }

    movieStore.add(req.body);

    return res.json({
        messageL: "movie added successfully"
    });
});

app.listen(3000, () => {
    console.log('server started at: 127.0.0.1:3000');
});
