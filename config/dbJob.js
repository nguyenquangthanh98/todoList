var mongoose = require('./dbConfig');
const Schema = mongoose.Schema;

// const ObjectId = Schema.ObjectId;

const listJob = new Schema({
    title: String,
    Content: String
}, {
    collection: "Job"
});

const JobModer = mongoose.model('job', listJob);

// JobModer.create({
//     title: "Dự án sdasdasdas",
//     Content: "Hoàn thành sadsada%"
// })

module.exports = JobModer;