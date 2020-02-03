var mongoose = require('./dbConfig');
var Schema = mongoose.Schema;

const UsersSchema = new Schema({
    gmail: String,
    password: String,
    type: {
        type: Number,
        default: 1
    }
});
const usersModel = mongoose.model('users', UsersSchema);
module.exports = usersModel;