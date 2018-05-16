'use strict';
const Sequelize = require('sequelize');
const config = require('./tsconfig.json');

const db = require('./Context')(Sequelize, config);
const server = require('./server')(db, config);

(async function() {
    await db.sequelize.sync();

    server.listen(3000, () => console.log('Server is running'));
})();

