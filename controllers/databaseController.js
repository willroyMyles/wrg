module.exports = async(app) => {


    console.log(await User.collection.estimatedDocumentCount())


    function authenticationMiddleware() {
        return (req, res, next) => {
            console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

            if (req.isAuthenticated()) return next();
            res.redirect('/login')
        }
    }








    module.exports.saveUser = saveUser;
    module.exports.login = login;

}