module.exports = app => {
    
    // Persistencia do usuario
    app.post('/signup', app.api.user.save)
}