const CrudService = require('./Crud');
const validator = require('../Helpers/validation');
const bcrypt = require('bcryptjs');

class UserService extends CrudService{
    constructor(repository){
        super(repository);
    }

    async create(data){
        const validRes = validator.check('post'. data);
        data.password=bcrypt.hashSync(data.password);
        if(validRes.error){
            return{code:400, message:'validation error'};
        }
        else{
            return super.create(data);
        }
    }

    async update(id, data){
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