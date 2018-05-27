const path = require('path');
const { User } = require(path.join(__models, 'User.model'));

module.exports = [
    async(ctx, next) => {
        try {
            const id = ctx.params['userID']
            const { username, password } = ctx.query;
            const users = await User.read({ id, username, password });
            const result = Object.create(null);
            result['data'] = users;
            ctx.body = result;
        } catch (err) {
            console.log(err.message || err);
            if (err.sql)
                console.log(`SQL error ${err.sql}`);
            ctx.throw(500);
        }
    }
];