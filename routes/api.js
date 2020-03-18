const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');

// Routes
router.get('/', (req, res) => {

    BlogPost
        .find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error.message)

        });

});

router.post('/save', (req, res) => {

    //console.log('Body: ', req.body);
    const data = req.body;
    const newBlogPost = new BlogPost(data)

    // Save data
    newBlogPost.save((error) => {
        if (error) {
            res
                .status(500)
                .json({msg: 'Internal server errors'});
        } else {
            res
                .status(200)
                .json({msg: 'Data saved successfully.'});
        }
    });

});

router.get('/name', (req, res) => {
    const data = {
        username: 'Hajikhani',
        age: 32
    };
    res.json(data);
});

module.exports = router;