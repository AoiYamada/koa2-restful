const koaBody = require('koa-body');

module.exports = [
    koaBody(),
    async(ctx, next) => {
        if (ctx.params['demoID'])
            ctx.body = 'demo' + ctx.params['demoID'];
        else
            ctx.body = 'demo';
    }
];