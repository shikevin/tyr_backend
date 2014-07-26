var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('User', { name:String });

var newUser = new User({ name: 'Kevin Shi' });


var userSchema = mongoose.Schema({
    name: String
});

newUser.save(function (err, results) {
    if (err) {
        console.error(e);
        process.exit(1);
    } else {
        console.log('Saved: ', results);
        process.exit(0);
    }
});
