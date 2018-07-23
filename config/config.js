module.exports = {
    constant: require('./constant'),
    database: require('./database').knex,
    middleware: require('./middleware')
}