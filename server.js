// define global const/functions
require('./lib/_global');
const path = require('path');
const { middleware, constant } = require('./config/config');
const Koa = require('koa');

const app = new Koa();
middleware(app);
app.listen(constant.PORT);

console.log(`Koa API is starting at port ${constant.PORT}`);