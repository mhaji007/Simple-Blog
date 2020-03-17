const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/api');


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


// Save data to Mongodatabase
const data = {
    title:'Welcome to this Blog',
    body: 'This is a simple blog to soldify softwared development using the MERN stack'
};

// // instantiate the model with data
// const newBlogPost = new BlogPost(data)

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
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

