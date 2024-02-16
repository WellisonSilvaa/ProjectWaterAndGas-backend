// para conectar com o aquivo de conexao com o banco de dados //
const config = require('../knexfile')
const knex = require('knex')(config)

knex.migrate.latest([config])
module.exports = knex