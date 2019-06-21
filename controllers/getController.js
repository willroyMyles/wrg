module.exports = async(app) => {

    var Papa = require('papaparse');
    var fs = require('fs');
    const csv = fs.readFileSync('parts.txt', 'utf8');
    var partsArr = [];
    Papa.parse(csv, {
        complete: function(results) {
            partsArr = results.data;
        }
    });
    app.parts = partsArr;

    app.get('/', (req, res) => {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('body', { data: app.parts, login: false, name: req.user == undefined ? false : req.user.username });
    });

    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.get('/signup', (req, res) => {
        res.render('sign up');
    });

    app.get('/index', async(req, res) => {
        function run() {
            var arr = [];
            for (let index = 0; index < 10; index++) arr.push({ name: "name " + index, price: "price " + index });
            return arr;
        }
        var arr = await run();
        res.render('body', { data: arr });
    })

    var routeText = [];
    var r;
    app.parts.forEach(element => {
        for (let i = 0; i < element.length; i++) {
            r = element[i].replace(/ /g, '%20');
            routeText.push(r);
        }
    });

    routeText.forEach((val, index) => {
        app.get('/' + val, (req, res) => {
            var index = getIndexOfRoute(val);
            var opts = [];
            console.log(index);
            for (let i = 0; i < app.parts[index.first].length; i++) {
                const element = app.parts[index.first][i];
                opts.push(element);
            }
            res.render('primary pages/primary template', { title: app.parts[index.first][0], links: opts, highlighted: { first: index.first, second: index.second }, name: req.user == undefined ? false : req.user.username });
        })
    })

    function getIndexOfRoute(route) {
        var val = route.replace(/%20/g, ' ');
        var first = 0;
        var second = 0;

        for (let i = 0; i < app.parts.length; i++) {
            console.log(app.parts[i])
            if (val == app.parts[i]) return { first, second };


            for (let j = 0; j < app.parts[i].length; j++) {

                const element = app.parts[i][j];
                if (val == app.parts[i][j]) return { first, second };
                second++;
            }
            first++;
            second = 0;
        }

        return { first, second };

    }


    app.get('/create-post', (req, res) => {
        if (req.isAuthenticated) var val = req.user.username
        else var val = false
        res.render('primary pages/create post', { name: val });
    })
}