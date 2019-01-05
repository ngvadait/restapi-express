class MovieStore {
    constructor() {
        this.movieData = require('./datastore');
    }

    all() {
        return this.movieData;
    }

    find(title) {
        return this.movieData.filter(m => m.Title === title);
    }

    add(movie) {
        this.movieData.push(movie);
    }

    has(title) {
        let movies = this.find(title);

        return movies.length > 0;
    }
}

module.exports = MovieStore;
