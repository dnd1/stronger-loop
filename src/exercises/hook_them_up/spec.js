const app = global.submission;

import { describe, it } from 'mocha';
import { expect, assert } from 'chai';
import 'supertest-as-promised';

describe('Model your way up', () => {

    var server;

    beforeEach(done => {
        server = app.listen(done);
    });

    afterEach(done => {
        server.close(done);
    });

    it('should be a \'DndUser\' model', done => {
        var DndUser = app.models['DndUser'];
        assert.isDefined(DndUser);
        done();
    });

    it('\'DndUser\' model should extend the base \'User\' model', done => {
        var DndUser = app.models['DndUser'];
        assert.equal(DndUser.definition.settings.base, 'User');
        done();
    });

    it('should be a \'Tweet\' model', done => {
        var Tweet = app.models['Tweet'];
        assert.isDefined(Tweet);
        done();
    });

    it('\'Tweet\' model should extend the base \'PersistedModel\' model', done => {
        var Tweet = app.models['Tweet'];
        assert.equal(Tweet.definition.settings.base, 'PersistedModel');
        done();
    });
});
