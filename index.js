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

app.listen(3000, () => {
    console.log('server started at: 127.0.0.1:3000');
});
