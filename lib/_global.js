const fs = require('fs');
const path = require('path');

// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
global.__walk = dir => {
    const results = [];
    const list = fs.readdirSync(dir);
    let pending = list.length;
    if (!pending) return results;
    for (let file of list) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            const res = __walk(file);
            results.push(...res);
            if (!--pending) return results;
        } else {
            results.push(file);
            if (!--pending) return results;
        }
    }
};

// https://stackoverflow.com/questions/14172455/get-name-and-line-of-calling-function-in-node-js
Object.defineProperty(global, '__stack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__line', {
    get: function() {
        return __stack[1].getLineNumber();
    }
});

Object.defineProperty(global, '__function', {
    get: function() {
        return __stack[1].getFunctionName();
    }
});

// paths
global.__cwd = process.cwd();
global.__app = path.join(__cwd, 'app');
global.__lib = path.join(__cwd, 'lib');
global.__models = path.join(__cwd, 'models');
global.__modules = path.join(__cwd, 'modules');

// forbid change
// Object.freeze(global); // some node module need to modify global...