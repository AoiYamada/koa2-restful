const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

function add_routers(router, rules, name){
    for(let method in rules) {
        if(method.startsWith('GET')) {
            let path = method.slice(4) + name;
            router.get(path, rules[method]);
        }else if(method.startsWith('POST')) {
            let path = method.slice(5) + name;
            router.post(path, rules[method]);
        }else {
            console.log('Invalid method');
        }
    }
}

function read(router) {
    let files = __walk(__app);
    for(let i of files) {
        if(i.endsWith('controller.js')) {
            let n = i.split('/')[0].split(".");
            const s = require(i);
            n = n.length === 3 ? n[0] : '';
            add_routers(router, s, n);
        }
    }
}

module.exports = () => {
    read(router);
    return router;
}