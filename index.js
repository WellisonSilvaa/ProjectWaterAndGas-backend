const express = require('express')
const app = express()
// importação do knex que da acesso ao banco de dados, por isso db
const db = require('./config/db')
const consign = require('consign')

consign()
    // Adcionado o passport na api
    .include('./config/passport.js')
    
    .then('./config/middlewares.js')
    // Para carregar todos os arquivos da pasta api, que são as funcões de persistencia, delete, update...
    .then('./api')
    // Para carregar as Rotas.
    .then('./config/routes.js')
    // Agora sempre que o consig for carregar um módulo ele passa "app" como parametro
    .into(app)

// Agora o app recebe o Knex = Banco de dados
app.db = db

app.listen(3000, () => {
    console.log('Backend executando...')
})