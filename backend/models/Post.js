const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postShema = new Schema({
    user: {
        type: Schema.Types.Object,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postShema);