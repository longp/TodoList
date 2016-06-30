const mongoose = require('mongoose');
mongoose.connect = ('mongodb://localhost/todolist')

var db = mongoose.connect;

module.exports = db;
