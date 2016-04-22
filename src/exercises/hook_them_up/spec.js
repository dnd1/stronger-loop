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
                .then(() => { done(); })
                .catch(done);
        });
    });

    after(done => {
        server.close(done);
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

    it('\'createdAt\' should remain the same after updating a \'DndUser\'', done => {
        api.post('/api/dndusers/login')
            .send({ email: 'daniel@dnd1.com', password: 'blah' })
            .then(res => {
                return Promise.all([
                    res.body,
                    api.get('/api/dndusers/1')
                    .set({ Authorization: res.body.id })
                ]);
            })
            .then(res => {
                var token = res[0];
                var originalDate = res[1].body.createdAt;
                return Promise.all([
                    originalDate,
                    api.put('/api/dndusers/1')
                    .set({ Authorization: token.id })
                    .send({ fullName: 'Simon Bolivar' })
                ]);
            })
            .then(res => {
                assert.equal(res[0], res[1].body.createdAt);
            })
            .then(done)
            .catch(done);
    });

    it('\'createdAt\' should remain the same after updating a \'Tweet\'', done => {
        return api.get('/api/tweets/1')
            .then(res => {
                var originalDate = res.body.createdAt;
                return Promise.all([
                    originalDate,
                    api.put('/api/tweets/1').send({ text: 'Esto es un tweet' })
                ]);
            })
            .then(res => {
                assert.equal(res[0], res[1].body.createdAt);
            })
            .then(done)
            .catch(done);
    });

    it('should hide the "password" property from \'DndUser\' details', done => {
        api.post('/api/dndusers/login')
            .send({ email: 'daniel@dnd1.com', password: 'blah' })
            .then(res => {
                return api.get('/api/dndusers/1')
                    .set({ Authorization: res.body.id });
            })
            .then(res => {
                expect(res.body).to.not.have.property('password');
            })
            .then(done)
            .catch(done);
    });

    it('should hide the "fullName" property from \'DndUser\' details', done => {
        api.post('/api/dndusers/login')
            .send({ email: 'daniel@dnd1.com', password: 'blah' })
            .then(res => {
                return api.get('/api/dndusers/1')
                    .set({ Authorization: res.body.id });
            })
            .then(res => {
                expect(res.body).to.not.have.property('fullName');
            })
            .then(done)
            .catch(done);
    });

});
