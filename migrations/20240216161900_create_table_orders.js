/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
        table.increments('id').primary()
        table.string('client')
        table.string('product').notNullable()
        table.integer('quantity').notNullable()
        table.string('product2')
        table.integer('quantity2')
        table.dateTime('orderTime').notNullable()
        table.string('formPayment').notNullable()
        table.double('change').notNullable()
        table.string('creditOrDebit').notNullable()
        table.string('customerAddress').notNullable()
        table.string('additionalInfo').notNullable()
        table.dateTime('doneAt')
        // Referencia ao ID da tabela USERS 
        // Referencia ao mysql
        table.integer('userId').unsigned()
        table.foreign('userId').references('users.id')

        // Referencia utilizando o postgresql
        // table.integer('userId').references('id').inTable('users').notNull()

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('orders')
};
