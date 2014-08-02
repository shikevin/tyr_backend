var mongoose = require('mongoose');

var meetupSchema = new mongoose.Schema({
    room: { type: String, index:true },
    status: String,
    numUsers: Number,

    users: [mongoose.Schema({
        id: String,
        username: String,
        latitude: String,
        longitude: String
    }, { _id: false })]
});

module.exports = mongoose.model('Meetup', meetupSchema);