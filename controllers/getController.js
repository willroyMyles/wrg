module.exports = async(app) => {

    app.get('/', (req, res) => {
        res.render('body', { data: false, login: false });
    });

    app.get('/signin', (req, res) => {
        res.render('signin')
    })

    app.get('/index', async(req, res) => {
        function run() {
            var arr = [];
            for (let index = 0; index < 10; index++) arr.push({ name: "name " + index, price: "price " + index });
            return arr;
        }
        var arr = await run();
        res.render('body', { data: arr });
    })








}