const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/blog_post', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connection listener
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!')
});

// Schema
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body:String,
    date:{
        type: String,
        default: Date.now()
    }
});

// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Save data to Mongodatabase
const data = {
    title:'Welcome to this Blog',
    body: 'This is a simple blog to soldify softwared development using the MERN stack'
};

// instantiate the model with data
const newBlogPost = new BlogPost(data)

// newBlogPost.save((error) => {
//     if (error) {
//         console.log('Somehting went wrongQ')
//     } else {
//         console.log('Data has been successfully saved!');
//     }
// });
// .save()

// Http request logger
app.use(morgan('tiny'));

// Routes
app.get('/api', (req, res) => {

    BlogPost.find({})
    .then((data)=>{
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error.message)

    });

});

app.get('/api/name', (req, res) => {
    const data = {
        username: 'Hajikhani',
        age: 32
    };
    res.json(data);
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
