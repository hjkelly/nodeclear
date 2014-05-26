var express = require('express'),
    api_list = require('./routes/list'),
    bodyParser = require('body-parser');

var PORT = 8000;
var app = express();
app.use(bodyParser());

app.get('/api/lists', api_list.all);
app.post('/api/lists', api_list.create);
app.get('/api/lists/:id', api_list.info);
app.post('/api/lists/:id', api_list.update);
app.delete('/api/lists/:id', api_list.delete);

app.listen(PORT);
console.log('Listening on port '+PORT+'...');
