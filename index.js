let express = require("express");
let bodyParser = require('body-parser');
let app = express();
let movieRouter = require('./router/movie-router');

app.use(bodyParser.json({
    type: 'application/json'
}));

app.use('/movies', movieRouter);
app.get('/', (req, res) => {
    return res.redirect('/movies');
});

app.listen(3000, () => {
    console.log('server started at: 127.0.0.1:3000');
});
