// Para criptografar a senha do usuário
const bcrypt = require('bcrypt')

module.exports = app => {

    const save = async (req, res) => {

        var dados = req.body
        dados.password = await bcrypt.hash(dados.password, 8)

        app.db('users')
            .insert({
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: req.body.password

            })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).json(err))
    }

    return { save }
}
