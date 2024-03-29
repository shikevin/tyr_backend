var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        set: function(value) { return value.trim().toLowerCase() },
        validate: [
            function(email) {
                return(email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`
                {|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null)},
            'Invalid email'
        ]
    },
    password: String,
    sessionkey: String
});

module.exports = mongoose.model('User', userSchema);