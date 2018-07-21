const table = __filename.split('.')[0].toLowerCase();
const db = __config.database;
class User {
  construct() {

  }

  static async view() {
    console.log(db)
  }
}

module.exports = {
  User
}