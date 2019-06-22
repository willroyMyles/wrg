var express = require('express');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

var app = express();
app.use(express.static('./public/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.set('view engine', 'ejs');

//authentication
//mot to another file soon



start()

function start() {

    let port = process.env.PORT;
    if (port == null || port == "") {
        port = 8000;
    }
    app.listen(port);
    console.log("listening on port " + port);


    var pc = require('./controllers/postController')(app);
    var gc = require('./controllers/getController')(app);
}