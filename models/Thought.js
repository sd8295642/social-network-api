const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
    thoughText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
    username: {
        type: String,
        required: true,
    },
    reactions: []
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;