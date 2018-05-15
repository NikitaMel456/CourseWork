const CrudService = require('./crud');
const validator = require('../helpers/validation');

class PostService extends CrudService {
    constructor(repository) {
        super(repository);
    }

    async readAll(data) {

        let posts = await this.repository.findAll();//super.readChunk();
        let rc = [];
        posts.forEach(post => {
            if (post.authorId == data.authorId)
                rc.push(post);
        });
        return rc;
    }

    async readWhere(data) {

        return await super.readWhere(data);//super.readChunk();
        // let rc = [];
        // posts.forEach(post => {
        //     if (post.authorId == data.authorId)
        //         rc.push(post);
        // });
        // return rc;
    }

    async create(data) {
        const validRes = validator.check('post'.data);
        if (validRes.error) {
            return {code: 400, message: 'validation error'};
        }
        else {
            return super.create(data);
        }
    }

    async update(id, data) {
        const validRes = validator.check('postUpd'.data);
        if (validRes.error) {
            return {code: 400, message: 'validation error'};
        }
        else {
            return super.update(id, data);
        }
    }
}

module.exports = PostService;