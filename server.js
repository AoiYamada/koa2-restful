// define global const/functions
require('./lib/_global');

const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
// const koaBody = require('koa-body');
const Config = require('config');
const PORT = Config.PORT;
const router = require(path.join(__app, 'router'));

const app = new Koa();
app
    .use(logger())
    // .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(PORT);

console.log(`Koa API is starting at port ${PORT}`);