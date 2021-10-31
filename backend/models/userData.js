const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    house:{
        type: String,
    },
    phone: {
        type: String,
    },
    co: {
        type: String,
    },
    country: {
        type: String,
    },
    dist: {
        type: String,
    },
    lm: {
        type: String,
    },
    loc: {
        type: String,
    },
    pc: {
        type: String,
    },
    state: {
        type: String,
    },
    vtc: {
        type: String,
    },
})

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;