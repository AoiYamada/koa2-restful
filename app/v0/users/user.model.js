const table = this.constructor.name.toLowerCase();
const db = __config.database;


class User {
  construct() {}

  static async view(table, { key }, {order_by, sort_by, limit=50, offset=0, ...attach} = {}) {
    console.log(attach)
    let query = db(table);
    if(order_by && sort_by) {
      query.orderBy(order_by, sort_by);
    }
    if(Object.keys(key).length) {
      query.where(key);
    }
    return await query.limit(limit).offset(offset).select();
  }
  
  static async insert(table, params) {

  }
}

module.exports = {
  User
}