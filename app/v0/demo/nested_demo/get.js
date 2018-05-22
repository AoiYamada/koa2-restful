module.exports = [
    async(ctx, next) => {
        ctx.body = 'nested_demo';
        if (ctx.params['demoID']) {
            ctx.body += '\ndemo' + ctx.params['demoID'];
        }
        if (ctx.params['nested_demoID']) {
            ctx.body += '\nnested_demo' + ctx.params['nested_demoID'];
        }
    }
];