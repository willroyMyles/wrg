module.exports = async(app) => {

    var db = require('./databaseController');
    var bodyParser = require('body-parser').urlencoded({ extended: false });

    db(app);




    app.post('/login', async(req, res) => {
        var user = await db.login(req.body);
        var status;
        console.log();
        if (user) status = true;
        else status = false;
        site.replace(/\/$/, "");
        res.render('body', { data: false, login: status });
    });

    app.post('/signUp', async(req, res) => {
        var status = await db.saveUser(req.body);
        res.render('body', { data: false, login: status });
    })

}