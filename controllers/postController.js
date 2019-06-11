module.exports = async(app) => {

    var db = require('./databaseController');
    var bodyParser = require('body-parser').urlencoded({ extended: false });
    db(app);


    app.post('/login', bodyParser, (req, res) => {
        console.log(req.body);
        res.render('body', { data: false });
    });

}