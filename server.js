var express = require('express'),
    api_list = require('./routes/list'),
    bodyParser = require('body-parser');

var PORT = 8000;
var app = express();
app.use(bodyParser());

// Serve static files, including those needed for AngularJS/ng.
app.use('/lib', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/ng-app/js'));
app.use('/css', express.static(__dirname + '/ng-app/css'));
app.use('/partials', express.static(__dirname + '/ng-app/partials'));

// Here's the API stuff!
app.get('/api/lists', api_list.all);
app.post('/api/lists', api_list.create);
app.get('/api/lists/:id', api_list.info);
app.post('/api/lists/:id', api_list.update);
app.delete('/api/lists/:id', api_list.delete);

// If they come to the main path, redirect them to index, the app.
app.get('/*', function(req, res) {
    res.sendfile('ng-app/index.html');
});

app.listen(PORT);
console.log('Listening on port '+PORT+'...');
