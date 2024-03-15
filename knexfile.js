module.exports = {
  client: 'mysql2',
  connection: {
    host : 'roundhouse.proxy.rlwy.net',
    port : 58761,
    database: 'railway',
    user: 'root',
    password: 'Cc1H5BE644bdcDAaDFa625cBffg-2FAd',
    
  },
  // client: 'mysql',
  // connection: {
  //   database: 'projectwaterandgas',
  //   user: 'root',
  //   password: ''
  // },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};