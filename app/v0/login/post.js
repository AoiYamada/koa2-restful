const koaBody = require('koa-body');
const path = require('path');
const { User } = require(path.join(__models, 'User.model'));

module.exports = [
    koaBody(),
    async(ctx, next) => {
        const { username, password } = ctx.request.body;

        if (username && password) {
            try {
                const result = Object.create(null);
                result['success'] = await User.login({ username, password });
                ctx.body = result;
            } catch(err) {
                ctx.throw(401, err.message);
            }
        } else {
            ctx.throw(401, 'Unauthorized');
        }
    }
];