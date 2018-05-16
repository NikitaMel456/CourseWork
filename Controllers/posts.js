'use strict';
const CrudController = require('./crud');

class PostsController extends CrudController{
    constructor(Service){
        super(Service);

        this.readAll = this.readAll.bind(this);
        this.readWhere = this.readWhere.bind(this);
        this.registerRoutes();
    }

    async readAll(req, res){
        let data = await this.service.readChunk(req.query);
        res.json(data);
    }
    async readWhere(req, res){
        console.log(req.query);
        let data = await this.service.readWhere(req.query);
        res.json(data);
    }
}

module.exports = (Service) => {
    const controller = new PostsController(Service);
    return controller.router;
}