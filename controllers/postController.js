module.exports = async(app, db) => {


    var passport = require('passport')








    // app.post('/login', async(req, res) => {
    //     var user = await login(req.body);

    //     if (user) req.login(user._id, (err) => {
    //         res.redirect('/', 303, { id: user._id, name: user.username });
    //     });
    //     else {
    //         res.redirect('/login', 404, { flash: true });
    //     }
    // });

    app.post('/create/post', async(req, res, error) => {
        var post = {
            _id: null,
            userId: req.user._id,
            title: req.body.title,
            body: req.body.body,
            category: req.body.category_index,
            sub_category: req.body.sub_category_index,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            replies: []
        }

        db.savePost(post);


        res.render('sign up');
    })



    app.post('/validate', (req, res) => {
        res.send("");
    });







    //database stuff

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
                    if (err) return false;
                    return true;

                });
            }
        });

    }


}