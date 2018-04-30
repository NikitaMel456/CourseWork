const express = require('express');

module.exports = (
    userService,
    postService,
) => {
    const router = express.Router();

    //defining cntroller
    const userController = require('./user')(
        userService,
        postService
    );
    const postController = require('./posts')(
        postService
    );


    //defining routers
    router.use('/users', userController);
    router.use('/posts', postController);

    return router;
};