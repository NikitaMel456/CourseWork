module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: Sequelize.STRING,
        },
        content:{
            type:Sequelize.STRING,
        },
        City:{
            type:Sequelize.STRING
        },
        Contact:{
            type:Sequelize.STRING,
            Default:"Not mentioned"
        },
        Salary:{
            type:Sequelize.INTEGER
        },
        Author:{
            type:Sequelize.STRING,
        },
        publishedOn: {
            type: Sequelize.DATE,
        }
    });
};