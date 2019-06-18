module.exports = async(app) => {

    var Papa = require('papaparse');
    var fs = require('fs');
    const csv = fs.readFileSync('parts.txt', 'utf8');
    var partsArr = [];
    console.log(csv);
    Papa.parse(csv, {
        complete: function(results) {
            partsArr = results.data;
            console.log(partsArr)
        }
    });
    app.parts = partsArr;

    app.get('/', (req, res) => {
        res.render('body', { data: app.parts, login: false });
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


    app.get('/engine&drivetrain', async(req, res) => {
        var t = app.parts[2][0];
        var opts = [];
        for (let index = 1; index < app.parts[2].length; index++) {
            const element = app.parts[2][index];
            opts.push(element);
        }
        res.render('primary pages/primary template', { title: app.parts[2][0], links: opts })
    })





}