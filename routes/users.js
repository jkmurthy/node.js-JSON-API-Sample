var mongo = require('mongodb');

var Server =  mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('userdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'users' database");
        populateDB();

        db.collection('users', {safe:true}, function(err, collection) {
            if (err) {
                console.log("Users");
                populateDB();
            }
        });
    }
});
 

exports.findAll = function(req, res) {
db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
  
  };


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    console.log('BSON Object' + new BSON.ObjectID(id));
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
  
  };


// Populate DB
//

var populateDB = function() {
 
    var users = [
    {
        name: "Rajeev N Bharshetty",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "RajShekhar Reddy",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};

