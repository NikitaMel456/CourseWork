module.exports = (Sequelize, sequelize) => {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password:{
            type: Sequelize.STRING,
        },
        phonenunber:{
            type: Sequelize.STRING,
        }

    });
};