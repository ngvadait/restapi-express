class MovieStore {
    constructor() {
        this.movieData = require('./datastore');
    }

    all() {
        return this.movieData;
    }
}

module.exports = MovieStore;
