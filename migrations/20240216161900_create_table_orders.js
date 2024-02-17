/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', order => {
        order.increments('id').primary()
        order.string('client')
        order.string('product').notNullable()
        order.integer('quantity').notNullable()
        order.string('product2')
        order.integer('quantity2')
        order.dateTime('orderTime').notNullable()
        order.double('formPayment').notNullable

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
