const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        //Declarando o local que irá vir o token//
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    //Com o payload da pra ter acesso ao Id do usuário
    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => {
                if(user) {
                    done(null, {
                        id: user.id,
                        email: user.email
                    })
                } else {
                    done(null, false)
                }
            })
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        initialize: () => passport.initialize(),
        //Não tem sessão envolvida na geração do Token //
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}