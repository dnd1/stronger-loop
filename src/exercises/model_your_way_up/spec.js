import { describe, it } from 'mocha';
import { expect, assert } from 'chai';

const app = global.submission;

describe('Model your way up', () => {

    var server;

    beforeEach(done => {
        server = app.listen(done);
    });

    afterEach(done => {
        server.close(done);
    });

    it('should have a User model', done => {
        assert(true);
        done();
        //expect(helloWorld).to.exist;
        //expect(helloWorld).to.be.a('function');
    });

    it('should fail', done => {
        assert.equal(1,2);
        done();
        //expect(helloWorld('test')).to.be.a('string');
    });
});
