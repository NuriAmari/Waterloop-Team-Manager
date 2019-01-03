const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
    team: { type: String },
    admin: { type: Boolean, required: true },
    resources: [],
});

module.exports = mongoose.model('User', userSchema);
