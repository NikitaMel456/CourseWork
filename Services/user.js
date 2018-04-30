const CrudService = require('./crud');
const validator = require('../helpers/validation');

class UserService extends CrudService{
    constructor(repository){
        super(repository);
    }

    async create(data){
        const validRes = validator.check('post'. data);
        if(validRes.error){
            return{code:400, message:'validation error'};
        }
        else{
            return super.create(data);
        }
    }

    async update(id, data){
        console.log(id);
        console.log(data);
        const validRes = validator.check('post'. data);
        if(validRes.error){
            return{code:400, message:'validation error'};
        }
        else{
            return super.update(id, data);
        }
    }
}

module.exports = UserService;