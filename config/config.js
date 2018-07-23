module.exports = {
    constant: require('./config'),
    database: require('./database').knex,
    middleware: require('./middleware')
}