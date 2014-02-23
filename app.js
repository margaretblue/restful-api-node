//loads modules needed
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    mongoose = require('mongoose');
    Schema = mongoose.Schema;

//creates the web server
var app = express();

//https://devcenter.heroku.com/articles/nodejs-mongoose
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

//hooks up the database named ecom_database
//deprecated  mongoose.connect('mongodb://localhost/ecomm_database');
//depricated   app.use(express.bodyParser());

app.configure(function () {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//adding schema to product model
var Product = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    style: { type: String, unique: true }
    modified: { type: Date, default: Date.now }
});

//create the ProductModel variable to use the product model
var ProductModel = mongoose.model('Product', Product);

//CRUD Methods

//READ a list of products
app.get('/api/products', function (req, res){
  return ProductModel.find(function (err, products) {
    if (!err) {
      return res.send(products);
    } else {
      return console.log(err);
    }
  });
});

//POST to CREATE a Single Product
app.post('/api/products', function (req, res) {
  var product;
  console.log("POST: ");
  console.log(req.body);
  product = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    style: req.body.style,
    images: req.body.images,
    categories: req.body.categories,
    catalogs: req.body.catalogs,
    variants: req.body.variants
  });
  product.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(product);
});

//READ GET a single product by ID
app.get('/api/products/:id', function(req,res){
  return ProductModel.findById(req.params.id, function (err, product) {
    if (!err) {
    }
  });
});

//UPDATE a single product by ID
app.put('/api/products/:id', function (req, res) {
  return ProductModel.findById(req.params.id, function (err, product) {
    product.title = req.body.title;
    product.description = req.body.description;
    product.style = req.body.style;
    product.images = req.body.images;
    product.categories = req.body.categories;
    product.catalogs = req.body.catalogs;
    product.variants = req.body.variants;
    return product.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});

//DELETE a single product by ID
app.delete('/api/products/:id', function (req, res) {
  return ProductModel.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

// Launch server
//sets up server to listen on port 4242
app.listen(4242);
