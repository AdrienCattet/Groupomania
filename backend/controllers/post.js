const Post = require('../models/Post.js');
const User = require('../models/User.js');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.find().sort({date: -1})
      .then(posts => {res.status(200).json(posts)})
      .catch(error => {res.status(500).json({error})});
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.postId})
      .then((post) => {
        if (req.auth.admin == true) {
          post.userId = 'true';
        }
        res.status(200).json(post)
      })
      .catch(error => res.status(404).json({error}));
};

exports.createPost = (req, res, next) => {
    const postObject = req.file ? {
      ...JSON.parse(req.body.newPost),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...JSON.parse(req.body.newPost)};
    delete postObject.userId;
    User.findOne({_id: req.auth.userId})
      .then(user => {
        postObject.userFirstName = user.firstName;
        postObject.userLastName = user.lastName;
        const newPost = new Post({
          ...postObject,
          userId: req.auth.userId,
        });
        newPost.save()
          .then(() => res.status(201).json({message: 'Nouveau post créé!'}))
          .catch(error => res.status(400).json({error}));
      })
      .catch(error => res.status(404).json({error}));
};

exports.modifyPost = (req, res, next) => {
    const postModified = req.file ? {
      ...JSON.parse(req.body.modifiedPost),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...JSON.parse(req.body.modifiedPost)};
    delete postModified.userId;
    Post.findOne({_id: req.params.postId})
      .then((post) => {
        if (req.auth.userId == post.userId) {
          const postImage = post.imageUrl.split('/images/')[1];
          if (postImage == 'default.png') {
            Post.updateOne({_id: req.params.postId}, {...postModified, _id: req.params.postId})
              .then(() => res.status(200).json({message: 'Post modifié!'}))
              .catch(error => res.status(401).json({error}));
          } else if (req.file == undefined) {
            Post.updateOne({_id: req.params.postId}, {...postModified, _id: req.params.postId})
              .then(() => res.status(200).json({message: 'Post modifié!'}))
              .catch(error => res.status(401).json({error}));
          } else {
            fs.unlink(`images/${postImage}`, () => {
              Post.updateOne({_id: req.params.postId}, {...postModified, _id: req.params.postId})
                .then(() => res.status(200).json({message: 'Post modifié!'}))
                .catch(error => res.status(401).json({error}));
            });
          }
        } else if (req.auth.admin == true) {
          const postImage = post.imageUrl.split('/images/')[1];
          if (postImage == 'default.png') {
            Post.updateOne({_id: req.params.postId}, {...postModified, _id: req.params.postId})
              .then(() => res.status(200).json({message: 'Post modifié!'}))
              .catch(error => res.status(401).json({error}));
          } else if (req.file == undefined) {
            Post.updateOne({_id: req.params.postId}, {...postModified, _id: req.params.postId})
              .then(() => res.status(200).json({message: 'Post modifié!'}))
              .catch(error => res.status(401).json({error}));
          } else {
            fs.unlink(`images/${postImage}`, () => {
              Post.updateOne({_id: req.params.postId}, {...postModified, _id: req.params.postId})
                .then(() => res.status(200).json({message: 'Post modifié!'}))
                .catch(error => res.status(401).json({error}));
            });
          }
        } else {
          res.status(401).json({message: 'Modification(s) non autorisée(s)'});
        }
      })
      .catch(error => res.status(400).json({error}));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.postId})
      .then(post => {
        if (post.userId == req.auth.userId) {
          const filename = post.imageUrl.split('/images/')[1];
          if (filename == 'default.png') {
            Post.deleteOne({_id: req.params.postId})
                .then(() => {res.status(200).json({message: 'Post supprimé!'})})
                .catch(error => res.status(401).json({error}));
          } else {
            fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({_id: req.params.postId})
                .then(() => {res.status(200).json({message: 'Post supprimé!'})})
                .catch(error => res.status(401).json({error}));
            });
          }
        } else if (req.auth.admin == true) {
          const filename = post.imageUrl.split('/images/')[1];
          if (filename == 'default.png') {
            Post.deleteOne({_id: req.params.postId})
                .then(() => {res.status(200).json({message: 'Post supprimé!'})})
                .catch(error => res.status(401).json({error}));
          } else {
            fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({_id: req.params.postId})
                .then(() => {res.status(200).json({message: 'Post supprimé!'})})
                .catch(error => res.status(401).json({error}));
            });
          }
        } else {
          res.status(401).json({message: 'Suppression non autorisée'});
        }
      })
      .catch(error => res.status(500).json({error}));
};

exports.ratePost = (req, res, next) => {
  if (req.body.likes == 1) {
    if (req.body.dislikes == -1) {
      Post.updateOne({_id: req.params.postId}, {
        $inc: {likes: 1, dislikes: -1},
        $push: {usersLiked: req.auth.userId},
        $pull: {usersDisliked: req.auth.userId}
      })
        .then(() => { res.status(201).json({message: "Like enregistré et dislike supprimé!"})})
        .catch(error => res.status(400).json({error}));
    } else {
      Post.updateOne({_id: req.params.postId}, {
        $inc: {likes: 1},
        $push: {usersLiked: req.auth.userId}
      })
        .then(() => { res.status(201).json({message: "Like enregistré!"})})
        .catch(error => res.status(400).json({error}));
    }
  } else if (req.body.dislikes == 1) {
    if (req.body.likes == -1) {
      Post.updateOne({_id: req.params.postId}, {
        $inc: {dislikes: 1, likes: -1},
        $push: {usersDisliked: req.auth.userId},
        $pull: {usersLiked: req.auth.userId}
      })
        .then(() => { res.status(201).json({message: "Dislike enregistré et like supprimé!"})})
        .catch(error => res.status(400).json({error}));
    } else {
      Post.updateOne({_id: req.params.postId}, {
        $inc: {dislikes: 1},
        $push: {usersDisliked: req.auth.userId}
      })
        .then(() => { res.status(201).json({message: "Dislike enregistré!"})})
        .catch(error => res.status(400).json({error}));
    }
  } else if (req.body.dislikes == -1) {
    Post.updateOne({_id: req.params.postId}, {
      $inc: {dislikes: -1},
      $pull: {usersDisliked: req.auth.userId}
    })
      .then(() => { res.status(201).json({message: "Dislike supprimé!"})})
      .catch(error => res.status(400).json({error}));
  } else if (req.body.likes == -1) {
    Post.updateOne({_id: req.params.postId}, {
      $inc: {likes: -1},
      $pull: {usersLiked: req.auth.userId}
    })
      .then(() => { res.status(201).json({message: "Like supprimé!"})})
      .catch(error => res.status(400).json({error}));
  }
};