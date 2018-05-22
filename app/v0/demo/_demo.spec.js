const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sholud = chai.should();
const path = require('path');
const CWD = process.cwd();
const LIB = path.join(CWD, 'lib');

require(path.join(LIB, '_global'));

const get = require(path.join(__dirname, 'get'))[1];

describe('Demo', () => {
    const _ctx = {};
    _ctx.params = {};

    it('Print "demo"', async() => {
        const ctx = Object.assign({}, _ctx);
        get(ctx);
        expect(ctx.body).equal('demo');
    });

    it('Print "demo${ID}"', async() => {
        const ctx = Object.assign({}, _ctx);
        const demoID = ~~(Math.random() * 100);
        ctx.params['demoID'] = demoID;
        get(ctx);
        expect(ctx.body).equal(`demo${demoID}`);
    });
});