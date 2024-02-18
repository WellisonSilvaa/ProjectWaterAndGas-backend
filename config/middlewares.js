const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors({
        // O asterisco significa que ele receberá requisições de qualquer origem
        origin: '*'
    }))
}