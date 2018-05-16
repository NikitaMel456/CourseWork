'use strict';
const Sequelize = require('sequelize');
const config = require('./tsconfig.json');

const db = require('./Context')(Sequelize, config);
const server = require('./server')(db, config);
const port = process.env.PORT || 3000;
(async function() {
    await db.sequelize.sync();

    server.listen(port, () => console.log('Server is running'));
})();

