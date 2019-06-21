module.exports = async(app) => {


    var passport = require('passport')
    var User = require('../models/user');

    var mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://user:cq8raK4jHEo2JngM@wrg-y3jqo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })

    var session = require('express-session');
    var passport = require('passport');
    const mongoStore = require('connect-mongo')(session);
    var LocalStrategy = require('passport-local').Strategy;
    app.use(session({
        secret: 'someRandomString',
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({ mongooseConnection: mongoose.connection }),
        //cookie: { secure: true }
    }));

    app.use(passport.initialize());
    app.use(passport.session());



    // app.post('/login', async(req, res) => {
    //     var user = await login(req.body);

    //     if (user) req.login(user._id, (err) => {
    //         res.redirect('/', 303, { id: user._id, name: user.username });
    //     });
    //     else {
    //         res.redirect('/login', 404, { flash: true });
    //     }
    // });

    app.post('/logout', (req, res) => {
        console.log('logout called');
        req.logout();
        req.session.destroy();
        res.redirect('/');

    });

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });


    passport.serializeUser(function(userId, done) {
        console.log(userId);
        done(null, userId);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, res) {
            done(err, res);
        });
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log(username);
            console.log(password);
            User.findOne({ username: username, password: password }, (err, res) => {
                if (err) { return done(err); }
                if (!res) { return done(null, false); }
                return done(null, res);
            });
        }
    ));



    function authenticationMiddleware() {
        return (req, res, next) => {
            console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

            if (req.isAuthenticated()) return next();
            res.redirect('/login')
        }
    }
    app.post('/signUp', async(req, res) => {
        var status = await db.saveUser(req.body);
        res.render('body', { data: false, login: status });
    })



    //database stuff
    async function login(body) {
        await User.findOne({ username: body.username, password: body.password }, (err, res) => {
            currentUser = res;
        });
        return currentUser;
    }
    async function logout() {
        currentUser = null;
    }

    async function saveUser(body) {
        var Id = await User.collection.estimatedDocumentCount() + 1;
        var user = {
            username: body.username,
            password: body.password,
            posts: null,
            _id: Id
        };
        User.findOne({ username: body.username, password: body.password }, (err, res) => {
            console.log(res);
            if (res) return false;
            else {
                User(user).save((err) => {
                    if (err) console.log(err);
                    return true;

                });
            }
        });

    }


}