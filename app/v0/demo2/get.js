module.exports = [
    async(ctx, next) => {
        if (ctx.params['demo2ID'])
            ctx.body = 'demo2' + ctx.params['demo2ID'];
        else
            ctx.body = 'demo2';
    }
];