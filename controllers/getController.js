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
            for (let i = 1; i < app.parts[index.first].length; i++) {
                const element = app.parts[index.first][i];
                opts.push(element);
            }
            res.render('primary pages/primary template', { title: app.parts[index.first][index.second], links: opts })
        })
    })

    app.get('/' + routeText, async(req, res) => {
        var t = app.parts[2][0];
        var opts = [];
        for (let index = 1; index < app.parts[2].length; index++) {
            const element = app.parts[2][index];
            opts.push(element);
        }
        res.render('primary pages/primary template', { title: app.parts[2][0], links: opts })
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
}