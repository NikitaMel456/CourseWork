const CrudController = require('./crud');
const helpers = require('../Helpers/helper');
const authCookie = '__service_token';

class PostController extends CrudController {
    constructor(postService) {
        super(postService);

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.readAll = this.readAll.bind(this);
        this.registerRoutes();
    }

    async readAll(req, res){
        const token = req.cookies[authCookie];
        const userToken = helpers.verifyToken(token);
        req.body.authorId = userToken.id;
       // req.body.authorId = req.params.userId;
        let data = await this.service.readAll(req.body);
        res.json(data);
    }

    async create(req, res){
        const token = req.cookies[authCookie];
        const userToken = helpers.verifyToken(token);
        req.body.authorId = userToken.id;
        let data = await this.service.create(req.body);
        //res.json(data);
        res.redirect('http://localhost:3000/post.html?id='+ data.id);
    }

    async update(req, res){
        const token = req.cookies[authCookie];
        const userToken = helpers.verifyToken(token);
        req.body.authorId = userToken.id;
        //req.body.authorId = req.params.userId;
        let data = await this.service.update(req.params.id, req.body);
        res.json(data);
    }
}

module.exports = (postService) => {
    const controller = new PostController(postService);
    return controller.router;
};