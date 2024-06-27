var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories'); // Impor rute categorie
var authRouter = require('./routes/auth');

//data model
var sequelize = require('./models/index'); // Tambahkan ini untuk memuat koneksi database
var Category = require('./models/category'); // Impor model Category
var Supplier = require('./models/supplier')
var Product = require('./models/product'); // Impor model Product

var Shipper = require('./models/shipper');
var Customer = require('./models/customer');
var Employee = require('./models/employee');
var Order = require('./models/order');

var OrderDetail = require('./models/orderDetail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json()); // Middleware untuk memproses data JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); // Middleware untuk menyajikan file statis


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter); // Gunakan rute categories
app.use('/auth', authRouter);

// Sinkronkan model dengan database
sequelize.sync()
 .then(() => {
 console.log('Database synchronized');
 })
 .catch(err => {
 console.error('Error synchronizing database:', err);
 });

module.exports = app;
