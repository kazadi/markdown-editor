var express = require('express');
var app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');

//public folder to store assets
app.use(express.static(__dirname + '/public'));

//routes for app
app.get('/', function (req, res) {
    res.render('pad');
});
app.get('/(:id)', function (req, res) {
    res.render('pad');
});

var sharejs = require('share');
require('redis');

var options = {
    db: {
        type: 'redis'
    },
};

//attach express server to sharejs
sharejs.server.attach(app, options);

//listen to port 9900 
var port = process.env.PORT || 9900;
app.listen(port);