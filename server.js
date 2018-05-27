// define global const/functions
require('./lib/_global');

const path = require('path');
const Koa = require('koa');
const helmet = require("koa-helmet");
const cors = require('@koa/cors');
const logger = require('koa-logger');
const compress = require('koa-compress')
// const koaBody = require('koa-body');
const Config = require('config');
const PORT = Config.PORT;
const router = require(path.join(__app, 'router'));

const app = new Koa();
app.keys = Config.KEYS;
app
    .use(helmet())
    .use(cors())
    .use(logger())
    .use(responseTime())
    .use(compress({
        filter: function(content_type) {
            return /text/i.test(content_type)
        },
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
    }))
    // .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(PORT);

console.log(`Koa API is starting at port ${PORT}`);

// helpers
// https://wohugb.gitbooks.io/koajs/content/document/application.html
function responseTime() {
    return async (ctx, next) => {
        const start = now();
        await next();
        const end = now();
        const ms = end - start;
        ctx.set('X-Response-Time', ms + 'ms');
    }
}

function now() {
    return Date.now();
}