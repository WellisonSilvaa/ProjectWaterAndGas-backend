module.exports = app => {
    
    // Persistencia do usuario
    app.post('/signup', app.api.user.save)
    
    //Login de usuário
    app.post('/signin', app.api.auth.signin)
}