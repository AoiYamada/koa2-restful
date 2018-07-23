// define global const/functions
require('./lib/_global');
const path = require('path');
const constant = require('./config/constant');
const middleWare = require('./config/middleware');
const Koa = require('koa');

const app = new Koa();
middleWare(app);
app.listen(constant.PORT);

console.log(`Koa API is starting at port ${constant.PORT}`);