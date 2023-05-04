
var mongoose = require('mongoose');

var errorSchema = new mongoose.Schema({
    printerNumber: Number,
    location: String,
    errorDate: Date,
    errorType: String
});