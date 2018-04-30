const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParse = require('body-parser');
//services
const UserService = require('./services/user');
const PostService = require('./services/post');

module.exports = (db, config) => {
    const app = express();
    //services
    const userService = new UserService(
        db.users
    );
    const postService = new PostService(
        db.posts
    );

    //controllers
    const apiController = require('./controllers/api')(
        userService,
        postService
    );

    //Mounting
    app.use(express.static('public'));
    app.use(cookieParser());

    app.use(bodyParse.json());
    app.use('/api', apiController);

    return app;
};