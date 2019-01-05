let express = require("express");
let movieRouter = express.Router();

let MovieStore = require('./moviestore');
let movieStore = new MovieStore();

function paginate(data, size, page) {
    let index = page - 1;
    return data.slice(index * size, (index + 1) * size);
}

movieRouter.get('/', (req, res) => {

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

movieRouter.get('/:title', (req, res) => {
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

movieRouter.put('/:title', (req, res) => {
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

movieRouter.delete('/:title', (req, res) => {
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

movieRouter.post('/', (req, res) => {
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

module.exports = movieRouter;
