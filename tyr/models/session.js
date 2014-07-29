var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    sessionkey: String,
    midpointLatitude: String,
    midpointLongitude: String
})