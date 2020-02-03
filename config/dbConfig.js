const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_project2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = mongoose;