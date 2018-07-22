const { User } = require('./User.model');

async function get(ctx, next) {
    try {
        
        const result = await User.view('user', { key:ctx.params}, ctx.query);
        console.log(result)
        ctx.status = 200;
        ctx.body = result;
    } catch (err) {
        ctx.throw(500, err);
    }
}

module.exports = {
    'SIGNUP /': get,
    'GET /': get,
    'GET /:user_id': get,
    'POST /': async (ctx, next) => {
    }
}