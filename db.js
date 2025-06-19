const pgp = require('pg-promise')()
const db = pgp({
    user: 'postgresql',
    password: '55555',
    host: 'localhost',
    database: 'postgres',
    port: '5433'
})

module.exports = db