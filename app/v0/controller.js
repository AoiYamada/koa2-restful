module.exports = {
    'GET /': async (ctx, next) => {
        ctx.body = 'Hello World';
    }
}