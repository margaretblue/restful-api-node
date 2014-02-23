//loads modules needed
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    mongoose = require('mongoose');

//creates the web server
var app = express();

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/ecomm_database';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

// Database
//hooks up the database named ecom_database
//mongoose.connect('mongodb://localhost/ecomm_database');

// Config
//app.use(express.bodyParser());

app.configure(function () {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

// Launch server
//sets up server to listen on port 4242
app.listen(4242);
