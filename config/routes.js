module.exports = app => {
    
    // Persistencia do usuario
    app.post('/signup', app.api.user.save)
    
    //Login de usuário
    app.post('/signin', app.api.auth.signin)

    app.route('/orders')
        .all(app.config.passport.authenticate())
        .get(app.api.order.getOrders)
        .post(app.api.order.save)
       
    app.route('/orders/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.order.remove)
        .put(app.api.order.update)

    app.route('/orders/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.order.toggleOrder)
}