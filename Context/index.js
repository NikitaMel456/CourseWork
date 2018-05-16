'use strict';
let pg = require('pg');
pg.defaults.ssl = true;

module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: config.db.dialect,//'postgres',// 'mysql',
        logging: false,
        define: {
            timestamps: true,

            paranoid: true,
            defaultScope: {
                where: { deletedAt: { $eq: null }}
            }
        }
    };
    //var db ='postgres://ioometgjahdzsz:f03380b9c7c27ad9a2fd5a9e75438d6e98ddabf90398147b256c494fff109d40@ec2-50-19-232-205.compute-1.amazonaws.com:5432/d2th3jrohudmoi'
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const User = require('../Models/User')(Sequelize, sequelize);
    const Post = require('../Models/Post')(Sequelize, sequelize);

    User.hasMany(Post, {foreignKey: 'authorId'});
    Post.belongsTo(User, {foreignKey: 'authorId', as: 'author'});

    return {
        users: User,
        posts: Post,

        Sequelize,
        sequelize,
    };
};