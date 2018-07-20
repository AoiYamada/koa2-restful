const logger = require('koa-logger');
const helmet = require("koa-helmet");
const koaBody = require('koa-body');
const path = require("path");
const router = require(path.join(process.cwd(), 'router'));
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
module.exports = (app)=>{

    let controller = router(app)
    if(isDev) {
        app.use(logger);
    }
    
    app .use(koaBody())
        .use(controller.routes())
        // .use(router.allowedMethods())

    app .use(async (ctx, next)=>{
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', ms);
    });

    app .use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(ctx.method + 'response - ' + ms);
    });

    if(isProd) {
        app .use(helmet)
            .use(router.allowedMethods())
    }
}