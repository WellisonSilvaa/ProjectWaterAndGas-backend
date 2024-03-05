const moment = require('moment');

module.exports = app => {
    const getOrders = (req, res) => {
        const date = req.query.date
            ? req.query.date
            : moment().endOf('day').toDate();

        app.db('orders')
            .where({ userId: req.user.id })
            .orderBy('orderTime')
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
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado o pedido com id ${req.params.id}.`;
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(500).json(err));
    }

    const update = (req, res) => {
        const orderId = req.params.id;
        const userId = req.user.id;

        app.db('orders')
            .where({ id: orderId, userId })
            .first()
            .then(order => {
                if (!order) {
                    return res.status(404).send('Pedido não encontrado.');
                }

                // Atualiza os campos desejados
                const updatedFields = req.body;
                app.db('orders')
                    .where({ id: orderId })
                    .update(updatedFields)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    }

    const updateDoneAt = (req, res, doneAt) => {
        app.db('orders')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleOrder = (req, res) => {
        app.db('orders')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(order => {
                if(!order) {
                    const msg = `Order com id ${req.params.id} não encontrada`;
                    return res.status(400).send(msg);
                }
                
                const doneAt = order.doneAt
                    ? null
                    : new Date()
                updateDoneAt(req, res, doneAt)
            })
            .catch(err => res.status(500).json(err))
    }

    return {
        getOrders,
        save,
        remove,
        update,
        toggleOrder
    }

}