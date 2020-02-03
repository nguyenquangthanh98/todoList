var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/my_project2', { useNewUrlParser: true, useUnifiedTopology: true });
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    title: String,
    Content: String
}, {
    collection: "Job"
});

let Job = mongoose.model('Job', UserSchema);

module.exports = Job;