const User = require('./user.model');
async function get(ctx, next) {
    try {
        // const result = User.view();
        ctx.status = 200;
        ctx.body = 'User Controller';
    } catch (err) {
        ctx.throw(500, err);
    }
}

module.exports = {
    'SIGNUP /': get,
    'GET /user': get,
    'POST /': async (ctx, next) => {

    }
}