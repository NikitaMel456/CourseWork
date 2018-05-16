'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParse = require('body-parser');
//services
const UserService = require('./Services/user');
const PostService = require('./Services/post');
const path = require("path");
//////
const helpers = require('./Helpers/helper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authCookie = '__service_token';
/////

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
    const apiController = require('./Controllers/api')(
        userService,
        postService
    );

    //Mounting
    app.use(bodyParse.json());
    app.use(express.static('public'));
    app.use(cookieParser());
    let  urlencodedParser = bodyParse.urlencoded({extended: false});
    app.use(express.static(path.join(__dirname, 'public')));
    /////////////////////////////////////
    app.use('/CreateP', async (req, res) => {
        const token = req.cookies[authCookie];
        const userToken = helpers.verifyToken(token);
        if (userToken) {
//             const user = await db.users.findById(userToken.id);
// console.log(req.body);
//             res.json(user);
            res.sendFile(__dirname + '/public/CreateP.html')
        }
        else {
            res.redirect('http://localhost:3000/login');
        }
    });


    app.get('/login', (req, res) => {
        const token = req.cookies[authCookie];

        if (helpers.verifyToken(token)) {
            res.redirect(req.query.callback + `?source/protected-resource&token=${token}`);
        }
        else {
            res.sendFile(__dirname + '/public/login.html');
        }
    });

    app.post('/login',urlencodedParser, async (req, res) => {
        const user = await db.users.findOne({
            where: {
                email: req.body.email
            },
            raw:true
        });
        if (!user || !bcrypt.compareSync(req.body.pass, user.password)) {
            console.log();
            res.json({code: 400, message: 'Invalid data'});
        }
        else {
            const newToken = jwt.sign({'id': user.id},
                'secret',
                {expiresIn: 30 * 60});
            res.cookie(authCookie, newToken);
            res.redirect(`http://localhost:3000/`);
        }
    });


    app.get('/Myposts',urlencodedParser, (req, res) => {
        const token = req.cookies[authCookie];

        if (helpers.verifyToken(token)) {
            const userToken = helpers.verifyToken(token);

            res.redirect("http://localhost:3000/Myposts.html?id="+userToken.id);
        }
        else {
            res.sendFile(__dirname + '/public/login.html');
        }
    });
/////////////////////////////////////

    app.use('/api',urlencodedParser, apiController);
    app.use('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    // app.use('/api/posts/2',(req,res)=>{
    //     res.sendFile(path.join(__dirname, 'public/post.html'));
    // });
    return app;
};