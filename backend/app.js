const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

// models
const users = require('./routes/users');
const posts = require('./routes/posts');

// setup environment
dotenv.config();

// connect to mongo db
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
    console.log('Conncted to mongodb successfully');
}).catch(err => {
    console.log(err);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/posts', posts);

// // serve static assets if in production
// if(process.env.NODE_ENV === 'production') {
//     // set static folder
//     app.use(express.static('frontend/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     });
// }

// run app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});