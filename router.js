const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

function add_routers(router, rules, name, version = 'v1'){
    for(let method in rules) {
        if(method.startsWith('GET')) {
            let path = version + method.slice(4) + name;
            console.log(path)
            router.get(path, rules[method]);
        }else if(method.startsWith('POST')) {
            let path = version + method.slice(5) + name;
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
            let version = i.match(/(\/v\d)(?!\w)/g)[0];
            let n = i.split('/').pop().split(".");
            const s = require(i);
            n = n.length === 3 ? n[0].toLowerCase() : '';
            add_routers(router, s, n, version);
        }
    }
}

module.exports = () => {
    read(router);
    return router;
}