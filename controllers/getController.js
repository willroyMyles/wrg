module.exports = async(app, db1) => {

    var moment = require('moment');

    var db = db1;

    var Papa = require('papaparse');
    var fs = require('fs');
    const csv = fs.readFileSync('parts.txt', 'utf8');
    var partsArr = [];
    Papa.parse(csv, {
        dynamicTyping: true,
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
        app.get('/' + val, async(req, res) => {
            var index = getIndexOfRoute(val);
            var opts = [];
            for (let i = 0; i < app.parts[index.first].length; i++) {
                const element = app.parts[index.first][i];
                opts.push(element);
            }

            var posts = await formatPostsToCard(await db.getPosts());
            res.render('primary pages/primary template', { title: app.parts[index.first][0], links: opts, highlighted: { first: index.first, second: index.second }, name: req.user == undefined ? false : req.user.username, cardInfo: posts });
        })
    })

    async function formatPostsToCard(posts) {
        var cardInfo = [];
        //console.log(moment(Date(), "hh:mm"));

        for (let index = 0; index < posts.length; index++) {
            const element = posts[index];

            var cardData = {};
            var newbod = String(element.body).split('>')[1] + "...";
            cardData.title = element.title;
            cardData.body = newbod;
            cardData.category = app.parts[element.category][element.sub_category];
            cardData.username = (await db.getUserName(element.userId)).username;
            cardData.time = element.time; //moment(element.time).format("LLLL  LT")
            cardInfo.push(cardData);

        }

        return cardInfo;
    }

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
        if (req.isAuthenticated) {
            var origin = req.query;
            console.log(app.parts[origin.main]);
            var val = req.user.username
                //getCarList();
            res.render('primary pages/create post 1', { name: val, array: app.parts, first: origin.main, second: origin.second });
        } else {
            res.redirect('/login').end('please login');
        }
    })

    async function getCarList() {
        var request = require('request');
        var cheerio = require('cheerio');
        var fs = require('fs');
        request('https://www.jacars.net/vehicles/cars/', async(err, res, body) => {
            var $ = cheerio.load(body);
            var select = $('select[name=mark] option');
            var arr = [];
            var i = 0;
            var arr1 = [];

            Array.from(select).forEach((val, index) => {
                if ($(val).text() != '')
                    arr.push($(val).text());
            })
            console.log(arr.length)


            debugger;
            await asyncForEach(arr, async(val, index) => {
                console.log(val)
                var link = val + '/';
                link = link.replace(/ /g, '-');
                link = link.toLowerCase();
                // await request(`https://www.jacars.net/vehicles/cars/` + link, (err, res, body) => {

                // })
                await new Promise(function(resolve, reject) {
                    if (link == 'hino-coaster/') link = 'hino';
                    if (link == 'hummer/') link = 'hammer';
                    if (link == 'mercedes-benz/') link = 'mercedes';
                    if (link == 'opel,-vauxhall/') link = 'opel-and-vauxhall';
                    if (link == 'tsx/') link = 'acura';

                    request(`https://www.jacars.net/vehicles/cars/` + link, async function(error, res, body) {
                        //console.log(`https://www.jacars.net/vehicles/cars/` + link)
                        var $ = cheerio.load(body);
                        var select1 = $('select[name=model] option');
                        var temp = [];
                        temp.push(arr[i]);
                        if (error) console.log(error)

                        Array.from(select1).forEach((val, index) => {
                            if ($(val).text() != '')
                                temp.push($(val).text())
                                //console.log($(val).text())
                            resolve();
                        })
                        arr1.push(temp);
                        temp = [];
                        i++;
                    });
                    console.log(`${index == arr.length}, ${index}, ${arr.length}`)
                    if (index == arr.length) resolve();
                });

            })
            console.log(arr1)
            fs.writeFile('text.csv', arr1, (err) => {
                if (!err) console.log('data written');
                else console.log(err);
            })

            var file = fs.createWriteStream('array.txt');
            file.on('error', function(err) { /* error handling */ });
            arr1.forEach(function(v) { file.write(v.join(', ') + '\n'); });
            file.end();

        });
    }

    async function retuenArray(arr, arr1) {
        return new Promise((resolve, reject) => {
            Array.from(arr).forEach((val, index) => {
                Array.from(arr1).push($(val).text());
            })
            resolve
        })
    }

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}