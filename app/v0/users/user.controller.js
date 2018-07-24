const { User } = require('./User.model');

async function get(ctx, next) {
    try {
        console.log(1)
        ctx.status = 200;
        const result = await User.view('user', { key:ctx.params}, ctx.query);
        if(result.length == 0) ctx.status = 204;
        ctx.body = result;
    } catch (err) {
        ctx.throw(500, err);
    }
}

async function post(ctx, next) {
    try{
        ctx.status = 200;
        const result = await User.insert('user', ctx.query);
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