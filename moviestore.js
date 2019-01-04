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
}

module.exports = MovieStore;
