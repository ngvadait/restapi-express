let express = require("express");
let app = express();

const datastore = require('./datastore.json');

let indexHandler =  (req, res) => {
    return res.send(datastore);
};

app.get('/', indexHandler);

app.listen(3000, () => {
    console.log('server started at: 127.0.0.1:3000');
});
