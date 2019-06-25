async function database(app) {


    var mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://user:cq8raK4jHEo2JngM@wrg-y3jqo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    var User = require('../models/user');
    var Post = require('../models/posts')

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
    console.log(await User.collection.estimatedDocumentCount())

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


    passport.use('local-signup', new LocalStrategy(
        (username, password, done) => {
            console.log('using passport strtegy')

            User.findOne({ username: username }, async(err, res) => {
                console.log(err);
                if (err) return done(err);
                if (res) return done(null, false, req.flash('signupMessage', 'username taken'));
                else {
                    var Id = await User.collection.estimatedDocumentCount() + 1;
                    var user = {
                        username: username,
                        password: password,
                        posts: null,
                        _id: Id
                    };
                    User(user).save((err) => {
                        console.log(err);

                        if (err) return done(err)
                        return done(null, user);

                    });
                }

            });

        }
    ));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failuerRedirect: '/signup',
        failuerFlash: true
    }));



    function authenticationMiddleware() {
        return (req, res, next) => {
            console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

            if (req.isAuthenticated()) return next();
            res.redirect('/login')
        }
    }

    //post operations

    //save post
    async function savePost(post) {
        var Id = await Post.collection.estimatedDocumentCount() + 1;
        post._id = Id;
        Post(post).save((err) => {
            if (err) return error;
        })
    }

    //get posts
    async function getPosts() {
        return await Post.find((err, res) => {
            //console.log(res);
            if (err) console.log(err);
            return res;
        })
    }

    //get username
    async function getUserName(userId) {
        return await User.findById(userId, (err, res) => {
            if (res) return res.username;
        })
    }





    //exports

    module.exports.savePost = savePost;
    module.exports.getPosts = getPosts;
    module, exports.getUserName = getUserName;

}
module.exports.db = database;