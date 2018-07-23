const logger = require('koa-logger');
const helmet = require("koa-helmet");
const koaBody = require('koa-body');
const path = require("path");
const router = require(path.join(__cwd, 'router'));
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
module.exports = app => {
    let controller = router();

    app.use(logger);
    
    app .use(koaBody())
        .use(controller.routes())

    app .use(async (ctx, next)=>{
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', ms);
    });

    if(isProd) {
        app .use(helmet)
            .use(router.allowedMethods())
    }
}