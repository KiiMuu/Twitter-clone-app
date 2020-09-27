const router = require('express').Router();
const passport = require('passport');
const Post = require('../models/Post');

// if user is not logged in, then he cannot create post, so we use passport to check that
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    // trim function is cutting the space at the beginning and the end of the text
    const text = req.body.text.trim();
    const newPost = new Post({
        user: {
            id: req.user.id,
            username: req.user.username
        },
        text
    });

    newPost.save().then(post => {
        res.json(post);
    }).catch(err => {
        console.log(err);
    });
});

// create route to get all posts from db
router.get('/', (req, res) => {
    // -1 means in descending order - see recent tweets first
    Post.find().sort({ createdAt: -1 }).then(posts => {
        res.json(posts);
    }).catch(err => {
        console.log(err);
    });
});


// get posts from your following or from all users
router.get('/following', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.find({
        'user.id': { $in: req.user.following }
    }).sort({ createdAt: 1 }).then(posts => {
        res.json(posts);
    }).catch(err => console.log(err));
});

// get user posts route
router.get('/:userId', (req, res) => {
    Post.find({ 'user.id': req.params.userId }).sort({ createdAt: -1 }).then(posts => {
        res.json(posts);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;