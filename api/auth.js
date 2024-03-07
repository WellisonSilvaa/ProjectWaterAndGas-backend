const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Dados incompletos')
        }
        // Aqui ele aguarda a verificação no banco de dados, pra depois ele continuar. //
        const user = await app.db('users')
            .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
            .first()

        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if(err || !isMatch) {
                    return res.status(401).send()
                }
                // o id ficara dentro do Token JWT //
                const payload = { id: user.id }
                res.json({
                    name: user.name,
                    email: user.email,
                    // Token que será criado para dar acesso a alterações na api //
                    // Ele utilizará o id do user e chave do authSecret //
                    token: jwt.encode(payload, authSecret),
                })
            })
        } else {
            res.status(400).send('Usuário não cadastrado')
        }
    }

    return { signin }
}