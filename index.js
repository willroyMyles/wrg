var express = require('express');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.set('view engine', 'ejs');


start()

function start() {

    let port = process.env.PORT;
    if (port == null || port == "") {
        port = 8000;
    }
    app.listen(port);
    console.log("listening on port " + port);

    var gc = require('./controllers/getController')(app);
    var pc = require('./controllers/postController')(app);
}