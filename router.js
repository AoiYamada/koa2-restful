const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

function add_routers(rules, name, validator, version = 'v1'){
    for(let method in rules) {
        if(method.startsWith('GET')) {
            if(name == '') var path = version;
            else path = version + name + method.slice(4);
            router.get(path, validator, rules[method]);
            console.log(path)
        }else if(method.startsWith('POST')) {
            if(name == '') var path = version;
            else path = version + name + method.slice(5);
            router.post(path, validator, rules[method]);
        }else {
            console.log('Invalid method');
        }
    }
}

function read() {
    let files = __walk(__app);
    for(let i of files) {
        if(i.endsWith('controller.js')) {
            i = i.replace(/\\/g, '\/');
            let version = i.match(/(\/v\d)\//g)[0];
            let n = i.split('/').pop().split(".");
            let s = require(i);
            validator = i.replace(`.controller.js`, `.validation.js`);
            validator = require(validator).validator;
            n = n.length === 3 ? n[0].toLowerCase() : '';
            add_routers(s, n, validator, version);
        }
    }
}

module.exports = () => {
    read();
    return router;
}