const defaultConfig = {
    "PORT": process.env.PORT || 3000
};

const devConfig = {};

const prodConfig = {};

const testConfig = {};

function envConfig(env) {
    switch(env) {
        case 'development':
            return devConfig;
            break;
        case 'production':
            return prodConfig;
            break;
        case 'test':
            return testConfig;
            break;
    }
}
module.exports = {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV)
}