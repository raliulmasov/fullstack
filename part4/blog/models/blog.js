const { ReturnDocument } = require("mongodb");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    url: String,
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: Number,
})

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

module.exports = mongoose.model('Blog', blogSchema)