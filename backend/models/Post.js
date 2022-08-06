const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {type: String, required: true},
    userFirstName: {type: String, required: true},
    userLastName: {type: String, required: true},
    date: {type: Date, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    imageUrl: {type: String, required: true, default: 'http://localhost:3000/images/default.png'},
    likes: {type: Number, required: true, default: 0},
    dislikes: {type: Number, required: true, default: 0},
    usersLiked: {type: Array, required: true, default: []},
    usersDisliked: {type: Array, required: true, default: []}
});

module.exports = mongoose.model('Post.js', postSchema);