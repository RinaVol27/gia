const pgp = require('pg-promise')()
const db = pgp({
    user: 'postgresql',
    password: '012345',
    host: 'localhost',
    database: 'avoska',
    port: '5432'
})

module.exports = db
