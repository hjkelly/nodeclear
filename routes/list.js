var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('nodeclear', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'nodeclear' database");
        db.collection('lists', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'lists' collection doesn't exist.");
            }
        });
    }
});

exports.all = function(req, res) {
    db.collection('lists', function(err, collection) {
        collection.find().toArray(function(err, lists) {
            res.send(lists);
        });
    });
};

exports.create = function(req, res) {
    var list = req.body;
    console.log("\nCREATE " + JSON.stringify(list));
    db.collection('lists', function(err, collection) {
        collection.insert(list, {safe:true}, function(err, result) {
            console.log("Result: " + JSON.stringify(result));
            if (err) {
                res.send({'error': "An error has occured."})
            }
            else {
                res.send(result[0])
            }
        });
    });
};

exports.info = function(req, res) {
    var id = new BSON.ObjectID(req.params.id);
    db.collection('lists', function(err, collection) {
        console.log("\nFIND " + id);
        collection.findOne({'_id': id}, function(err, list) {
            console.log("Result: " + JSON.stringify(list));
            res.send(list);
        });
    });
};

exports.update = function(req, res) {
    var id = new BSON.ObjectID(req.params.id);
    var list = req.body;
    console.log("\nUPDATE " + id + " with " + JSON.stringify(list));
    db.collection('lists', function(err, collection) {
        collection.update({'_id': id}, list, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error': "An error has occured."})
            }
            else {
                console.log("Result: updated " + result);
                req.body._id = req.params.id;
                res.send(req.body)
            }
        });
    });
};

exports.delete = function(req, res) {
    var id = new BSON.ObjectID(req.params.id);
    console.log("\nDELETE " + id);
    db.collection('lists', function(err, collection) {
        collection.remove({'_id': id}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error': "An error has occured."})
            }
            else {
                console.log("Result: deleted " + result);
                res.send(req.body)
            }
        });
    });
};
