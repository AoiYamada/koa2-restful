const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

const file_paths = __walk(__app);
for (const file_path of file_paths) {
    const dir_obj = path.parse(file_path);
    const method = dir_obj.name;
    switch(method) {
        case 'get':
        case 'post':
            const controller = dir_obj.dir.split('\\').slice(-1)[0];
            const base_with_ID = dir_obj.dir
                                .replace(__app, '')
                                .replace(/\\/g, '/')
                                .replace(/\/(?!v\d)([\w]+)/g, '/$1/:$1ID');
            const base_without_ID = base_with_ID.slice(0, -`:${controller}ID`.length);
            const handler = require(file_path);
            router[method](base_without_ID, ...handler);
        case 'put':
        case 'patch':
        case 'delete':
            router[method](base_with_ID, ...handler);
        case 'head':
        case 'options':
            // Pending
            break;
        default:
    }
}

module.exports = router;