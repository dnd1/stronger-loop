const app = global.submission;

import { describe, it } from 'mocha';
import { expect, assert } from 'chai';
var _ = require('lodash');

const sap = require('supertest-as-promised');
const api = sap('http://' + 'localhost' + ':' + app.get('port'));

describe('Hook them up', () => {

    var server;

    before(done => {
        server = app.listen(function() {

            Promise.all([
                    api.post('/api/dndusers').send({
                        fullName: 'Ramon',
                        email: 'ramon@dnd1.com',
                        password: 'blah',
                        emailVerified: true,
                        id: 1
                    }),
                    api.post('/api/dndusers').send({
                        fullName: 'John Doe',
                        email: 'john.doe@dnd1.com',
                        password: 'blah',
                        emailVerified: true,
                        id: 400
                    }),
                    api.post('/api/dndusers').send({
                        fullName: 'Daniel Rodriguez del Villar',
                        email: 'daniel@dnd1.com',
                        password: 'blah',
                        emailVerified: true,
                        id: 500
                    })
                ])
                .then(() => { done(); })
                .catch(done);
        });

        after(done => {
            server.close(done);
        });
    });


    it('should be in lowercase', done => {
        Promise.all([
                api.get('/api/dndusers/1/nickname'),
                api.get('/api/dndusers/400/nickname'),
                api.get('/api/dndusers/500/nickname'),
            ])
            .then(res => {
                _.each(res, r => {
                    assert(r.body.nickname == r.body.nickname.toLowerCase(), r.body.nickname + ' contains upper case letters');
                });
            })
            .then(done)
            .catch(done);
    });

    it('should not contain spaces', done => {
        Promise.all([
                api.get('/api/dndusers/1/nickname'),
                api.get('/api/dndusers/400/nickname'),
                api.get('/api/dndusers/500/nickname'),
            ])
            .then(res => {
                _.each(res, r => {
                    assert(r.body.nickname.indexOf(' ') < 0, r.body.nickname + ' contains spaces');
                });
            })
            .then(done)
            .catch(done);
    });

    it('should end with the user\'s id', done => {
        Promise.all([
                api.get('/api/dndusers/1/nickname'),
                api.get('/api/dndusers/400/nickname'),
                api.get('/api/dndusers/500/nickname'),
            ])
            .then(res => {
                _.each(res, r => {
                    assert(/-\d+$/.test(r.body.nickname), r.body.nickname + ' does not end with "-id"');
                });
            })
            .then(done)
            .catch(done);
    });

    it('should handle wrong id with a 404 user not found error', done => {
        api.get('/api/dndusers/12345/nickname')
            .expect(404)
            .then(() => { done(); })
            .catch(done);
    });

});
