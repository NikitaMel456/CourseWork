module.exports = (Sequelize, config) => {
    const options = {
        host: config.host,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: { deletedAt: { $eq: null }}
            }
        }
    };
    const sequelize = new Sequelize(config.dbName, config.user, config.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Post = require('../models/post')(Sequelize, sequelize);

    User.hasMany(Post, {foreignKey: 'authorId'});
    Post.belongsTo(User, {foreignKey: 'authorId', as: 'author'});

    return {
        users: User,
        posts: Post,

        Sequelize,
        sequelize,
    };
};