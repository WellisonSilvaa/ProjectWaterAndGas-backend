const moment =  require('moment');

module.exports = app => {
    const getOrders = (req, res) => {
        const date = req.query.date
            ? req.query.date
            : moment().endOf('day').toDate();

            app.db('orders')
                .where({ userId: req.user.id })
                .oderBy('orderTime')
                .then(orders => res.json(orders))
                .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        req.body.userId = req.user.id;
        
        app.db('orders')
        .insert(req.body)
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('orders')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado o pedido com id ${req.params.id}.`;
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400)).json(err)
    }
}