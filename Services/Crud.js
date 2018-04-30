class CrudService{
    constructor(repository, errors){
        this.repository = repository;
        this.errors = errors;

        this.defaults = {
            readChunk: {
                limit: 10,
                page: 1,
                order: 'asc',
                orderField: 'id'
            }
        }
    }

    async readChunk(options){
        options = Object.assign({}, this.defaults.readChunk, options);
        options.limit = parseInt(options.limit);
        options.page = parseInt(options.page);
        let limit = options.limit;
        let offset = (options.page - 1) * options.limit;

        let posts = await this.repository.findAll({
            limit: 5,
            offset: offset,
            order: [[options.orderField, options.order.toUpperCase()]],
            raw: true
        });
        for(let i = 0; i < posts.length; i++){
            posts[i].links = [];
            if(posts[i - 1]){
                posts[i].links[0] = {
                    rel: 'prev',
                    href: 'http://localhost:3000/posts/' + posts[i - 1].id
                };
            }
            posts[i].links[1] = {
                rel: 'self',
                href: 'http://localhost:3000/posts/' + posts[i].id
            }
            if(posts[i + 1]){
                posts[i].links[2] = {
                    rel: 'next',
                    href: 'http://localhost:3000/posts/' + posts[i + 1].id
                }
            }
        }
        let data = {
            posts: posts,
            meta: options
        }
        return data;
    }

    async read(id){
        id = parseInt(id);

        if (isNaN(id)) {
            throw this.errors.invalidId;
        }

        const item = await this.repository.findById(id);

        if (!item) {
            throw this.errors.notFound;
        }

        return item;
    }

    async create(data){
        const item = await this.repository.create(data);

        return item.get({ plain: true });
    }

    async update(id, data){
        await this.repository.update(data, { where: { id: id }, limit: 1 });

        return this.read(id);
    }

    async delete(id){
        return this.repository.destroy({ where: { id: id } });
    }
}

module.exports = CrudService;