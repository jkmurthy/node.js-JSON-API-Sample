var mongo = require('mongodb');

var Server =  mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('userdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'users' database");
       
        db.collection('users', {safe:true}, function(err, collection) {
            if (err) {
                console.log("Users");
                populateDB();
            }
        });
    }
});
 
// API /users GET
exports.findAll = function(req, res) {
db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
  
  };


// API /users/:id GET
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
  
  };

// API /users POST 
exports.addUser = function(req, res) {
  var user = req.body;
  console.log('Adding User');
  db.collection('users', function(err, collection) {
    collection.insert(user, {safe: true}, function(err, result){
      if(err){
        res.send({'error':'An error has occurred'}); 
      }else{
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);

      }
        
    });
    });
   };

// API /users/:id DELETE
exports.deleteUser = function( req, res) {
  var id = req.params.id;
    console.log('deleting ID'+id);
  db.collection('users', function(err, collection){
    collection.remove({'_id':new BSON.ObjectID(id)},{safe: true}, function(err, result){
      if(err){
         res.send({'error':'An error has occurred - ' + err});
      }
      else{
         console.log('' + result + ' document(s) deleted');
         res.send(req.body);    
      }
    });
  });
};

// API /users/:id PUT
exports.updateUser = function( req, res) {
  var id = req.params.id;
  var user = req.body;

  console.log('Updating The Entry');
  db.collection('users', function(err, collection){
    collection.update({'_id': new BSON.ObjectID(id)}, user, {safe: true}, function(err, result){
      if(err){
        console.log('Error Updating file');
      }
      else{
        res.send(user);
      }
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
        country: "India",
        region: "Bangalore",
        description: "Full Stack Web developer"
    },
    {
        name: "RajShekhar Reddy",
        year: "2006",
        grapes: "Tempranillo",
        country: "India",
        region: "Bangalore",
        description: "ROR Developer"
    }];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};

