const mongoose = require('../services/db.service').mongoose;
const Schema = mongoose.Schema;

const Teacher = new Schema({
    firstname: String,
    lastname: String,
    email: {required:true, unique:true, type: String},
    username: String,
    password: String
},
{timestamps: true}
)
module.exports = mongoose.model('Teachers', Teacher);