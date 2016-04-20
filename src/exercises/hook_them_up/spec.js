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
                    api.post('/api/tweets').send({ text: 'Hola Mundo' }),
                    api.post('/api/dndusers').send({
                        fullName: 'Daniel Rodriguez del Villar',
                        email: 'daniel@dnd1.com',
                        password: 'blah',
                        emailVerified: true
                    })
                ])
                .then(res => { done(); })
                .catch(done);
        });

        after(done => {
            server.close(done);
        });
    });


    it('should set the \'createdAt\' property for \'DndUsers\' objects', done => {

        api.post('/api/dndusers/login')
            .send({ email: 'daniel@dnd1.com', password: 'blah' })
            .then(res => {
                return api.get('/api/dndusers/1')
                    .set({ Authorization: res.body.id });
            })
            .then(res => {
                expect(res.body).to.have.property('createdAt');
            })
            .then(done)
            .catch(done);
    });

        it('should set the \'createdAt\' property for \'Tweet\' objects', done => {

            api.get('/api/tweets/1')
                .then(res => {
                    expect(res.body).to.have.property('createdAt');
                })
                .then(done)
                .catch(done);
        });

    it.skip('\'createdAt\' should remain the same after updating a \'DndUser\'', done => {
        done();
    });

    it.skip('\'createdAt\' should remain the same after updating a \'Tweet\'', done => {
        done();
    });

    it.skip('should hide the password property from \'DndUser\' details', done => {
        done();
    });

});
