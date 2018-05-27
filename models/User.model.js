const { MySQL } = require('mysql-promisify');
const Config = require('config');
const bcrypt = require('bcrypt');
const path = require('path');
// const { Common } = require(path.join(__models, 'Common.model'));

const db = new MySQL(Config.DB);

// use id as key user catch
const cache = Object.create(null);

/**
 * @property {Integer} id
 * @property {String} username
 * @property {String} password - hashed pw
 *
 */
// class User extends Common {
class User {
    /**
     * @param {Object} payload
     * @param {Integer} payload.id
     * @param {String} payload.username
     * @param {String} payload.password - hashed pw
     *
     */
    constructor(payload) {
        // super();
        Object.assign(this, payload);
        cache[this.id] = this;
    }

    /**
     * @param {Integer} id - user id
     * @return {Promise<User|Error>} resolve instance of user from db or cache
     *
     */
    static async getUser(id) {
        if (cache[id]) {
            return cache[id];
        } else {
            const { results } = await db.query({
                sql: `SELECT * FROM user WHERE id = :id;`,
                params: { id },
            });
            if (results.length) {
                const payload = results[0];
                const user = new User(payload);
                return user;
            } else {
                throw new Error('User not exist');
            }
        }
    }

    /**
     * @param {String} username
     * @param {String} password - not encrypted password
     * @return {Promise<True|Error>} testing
     *
     */
    static async login({ username, password }) {
        const { results } = await db.query({
            sql: `SELECT * FROM user WHERE username = :username;`,
            params: { username },
        });
        if (results.length) {
            const payload = results[0];
            if (compare(password, payload.password)) {
                const user = new User(payload);
                return true;
            } else {
                throw new Error('Wrong Password');
            }
        } else {
            throw new Error('User not found');
        }
    }

    /**
     * @param {String} username
     * @param {String} password - not encrypted password
     * @return {Promise<User|Error>} resolve instance of user from db or cache
     *
     */
    static async create({ username, password }) {
        const crypted_password = hash(password);
        const { results } = await db.query({
            sql: `INSERT INTO user (username, password) VALUES (:username, :crypted_password);`,
            params: { username, crypted_password },
        });
        if (results && results.insertId) {
            const id = results.insertId;
            return new User({ id, username, password: crypted_password });
        }
    }

    /**
     * @param {Integer} id
     * @param {String} username
     * @param {String} password - not encrypted password
     * @return {Promise<User[]|Error>} resolve instances of users from db or cache
     *
     */
    static async read({ id, username, password }) {
        if (id && cache[id]) {
            return cache[id];
        } else {
            const conditions = [];
            if (id) {
                conditions.push('id = :id');
            }
            if (username) {
                conditions.push('username = :username');
            }
            let crypted_password;
            if (password) {
                crypted_password = hash(password);
                conditions.push('password = :crypted_password');
            }
            let where = '';
            // if (conditions) {
            if (conditions.length) {
                where += `WHERE ${conditions.join(' AND ')}`;
            }
            const { results } = await db.query({
                sql: `SELECT * FROM user ${where};`,
                params: { id, username, crypted_password },
            });
            for (const payload of results) {
                if (!cache[payload.id]) {
                    new User(payload);
                }
            }
            return results.map(({ id }) => cache[id]);
        }
    }

    /**
     * @param {String} username
     * @param {String} password - not encrypted password
     * @return {Promise<True|Error>} testing
     *
     */
    async update({ username = this.username, password = this.password }) {
        const update_contents = [];
        if (username !== this.username) {
            update_contents.push('username = :username');
        }

        let crypted_password;
        if (password !== this.password) {
            crypted_password = hash(password);
            update_contents.push('password = :crypted_password');
        }

        if (update_contents.length) {
            const { results } = await db.query({
                sql: `UPDATE user SET ${update_contents.join(', ')} WHERE id = :id;`,
                params: { id: this.id, username, crypted_password },
            });
            this.username = username;
            this.password = crypted_password || this.password;
            return true;
        } else {
            throw new Error('Nothing to update');
        }
    }

    //     set username(username) {
    //         return new Promise(async(resolve, reject) => {
    //             try {
    //                 const { results } = await db.query({
    //                     sql: `
    // UPDATE user
    // SET username = :username
    // WHERE 
    //     id = :id
    // ;`,
    //                     params: { username, crypted_password },
    //                 });
    //                 this.username = username;
    //             }
    //         });
    //     }
}

module.exports = {
    User,
}

// helper
function hash(password) {
    return bcrypt.hashSync(password, Config.BCRYPT.SALT_ROUNDS);
}

function compare(password, crypted_password) {
    return bcrypt.compareSync(password, crypted_password);
}