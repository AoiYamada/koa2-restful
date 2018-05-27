const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const path = require('path');
const CWD = process.cwd();
const LIB = path.join(CWD, 'lib');

require(path.join(LIB, '_global'));

const { User } = require(path.join(__models, 'User.model'));

const { MySQL } = require('mysql-promisify');
const Config = require('config');
const db = new MySQL(Config.DB);

const bcrypt = require('bcrypt');

describe('User model', () => {
    it('Create user', async() => {
        try {
            const user = await User.create({
                username: 'AoiYamada' + Date.now(),
                password: 'admin',
            });
            should.exist(user);
            expect(user.id).to.be.an('number');
            expect(user.username).to.be.a('string');
            expect(user.password).to.be.a('string');
        } catch (err) {
            // if(err.sql)
            //     console.log(err.sql)
            should.not.exist(err.message || err);
        }
    });
    it('Get User', async() => {
        try {
            const user = await User.getUser(1);
            should.exist(user);
            expect(user.id).to.be.an('number');
            expect(user.id).equal(1);
            expect(user.username).to.be.a('String');
            expect(user.username).equal('AoiYamada');
            expect(user.password).to.be.a('string');
            assert(bcrypt.compareSync('admin', user.password), 'Password should pass bcrypt compare');
        } catch (err) {
            // if(err.sql)
            //     console.log(err.sql)
            should.not.exist(err.message || err);
        }
    });
    it('Login', async() => {
        try {
            const result = await User.login({
                username: 'AoiYamada',
                password: 'admin',
            });
            expect(result).to.be.an('boolean');
            expect(result).equal(true);
        } catch (err) {
            should.not.exist(err.message || err);
        }
    });

    // read
    // pending

    // update
    // pending

    after(async() => {
        try {
            expect(await db.end()).equal();
        } catch (err) {
            should.not.exist(err.message || err);
        }
    });
});