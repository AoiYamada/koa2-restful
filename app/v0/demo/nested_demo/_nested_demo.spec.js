const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const path = require('path');
const CWD = process.cwd();
const LIB = path.join(CWD, 'lib');

require(path.join(LIB, '_global'));

const get = require(path.join(__dirname, 'get'))[0];

describe('NestedDemo', () => {
    const _ctx = {};
    _ctx.params = {};
    const demoID = ~~(Math.random() * 100);
    _ctx.params['demoID'] = demoID;

    it('Print "nested_demo" "demo"&demoID', async() => {
        const ctx = Object.assign({}, _ctx);
        get(ctx);
        expect(ctx.body).equal(`nested_demo\ndemo${demoID}`);
    });

    it('Print "nested_demo" "demo${demoID}" "nested_demo${nested_demoID}"', async() => {
        const ctx = Object.assign({}, _ctx);
        const nested_demoID = ~~(Math.random() * 100);
        ctx.params['nested_demoID'] = nested_demoID;
        get(ctx);
        expect(ctx.body).equal(`nested_demo\ndemo${demoID}\nnested_demo${nested_demoID}`);
    });
});