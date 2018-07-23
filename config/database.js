exports.knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'test',
        port: 8889
    },
    pool: { min: 0, max: 7 }
});