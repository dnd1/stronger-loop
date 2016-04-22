const app = global.submission;

import { describe, it } from 'mocha';
import { expect, assert } from 'chai';
var _ = require('lodash');

const sap = require('supertest-as-promised');
const api = sap('http://' + 'localhost' + ':' + app.get('port'));

describe('Love Relations', () => {

    var server;

    before(done => {
        server = app.listen(function() {

            Promise.all([
                    app.models.DndUser.create({
                        fullName: 'Ramon',
                        email: 'ramon@dnd1.com',
                        password: 'blah',
                        emailVerified: true,
                        id: 1
                    }),
                    app.models.DndUser.create({
                        fullName: 'John Doe',
                        email: 'john.doe@dnd1.com',
                        password: 'blah',
                        emailVerified: true,
                        id: 400
                    })
                ])
                .then((res) => {
                    return api.post('/api/dndusers/login').send({ email: 'ramon@dnd1.com', password: 'blah' });
                })
                .then((res) => {
                    var tweets = [res.body];
                    for (var i = 1; i <= 10; i++) {
                        tweets.push(api.post('/api/dndusers/1/tweets')
                            .set({ Authorization: res.body.id })
                            .send({ text: 'Tu eres loco ramon: ' + i }));
                    }
                    return Promise.all(tweets);
                })
                .then((res) => {
                    return api.post('/api/dndusers/login').send({ email: 'john.doe@dnd1.com', password: 'blah' });
                })
                .then(res => {
                    return Promise.all([
                        api.put('/api/dndusers/400/favorites/rel/1').set({ Authorization: res.body.id }),
                        api.put('/api/dndusers/400/favorites/rel/2').set({ Authorization: res.body.id }),
                        api.put('/api/dndusers/400/favorites/rel/3').set({ Authorization: res.body.id })
                    ])
                })
                .then(res => {
                    //console.log(_.map(res, r => r.body));
                })
                .then(done)
                .catch(done);
        });
    });

    after(done => {
        server.close(done);
    });

    it('should have a "tweets" relation', done => {

        api.post('/api/dndusers/login').send({ email: 'ramon@dnd1.com', password: 'blah' })
            .then(res => {
                return api.get('/api/dndusers/1/tweets').set({ Authorization: res.body.id })
            })
            .then(res => {
                assert.equal(res.body.length, 10, 'Wrong tweet count');
            })
            .then(done)
            .catch(done);
    });

    it('should have a "favorites" relation', done => {

        api.post('/api/dndusers/login').send({ email: 'john.doe@dnd1.com', password: 'blah' })
            .then(res => {
                return api.get('/api/dndusers/400/favorites').set({ Authorization: res.body.id })
            })
            .then(res => {
                assert.equal(res.body.length, 3, 'Wrong favorite count');
            })
            .then(done)
            .catch(done);
    });

    it('should validate the tweet\' text when creating one', done => {
        api.post('/api/dndusers/login').send({ email: 'ramon@dnd1.com', password: 'blah' })
            .then(res => {
                return api.post('/api/dndusers/1/tweets').set({ Authorization: res.body.id })
            })
            .then(res => {
                assert.equal(res.body.error.statusCode, 422, 'Text can\'t be blank')
            })
            .then(done)
            .catch(done);
    });

    it('should not let Unauthenticated users create tweets', done => {
        api.post('/api/dndusers/1/tweets').send({ text: 'Test Text!' })
            .expect(401, done);
    });

    it('should not let Unauthenticated users link tweets as favorites', done => {
        api.put('/api/dndusers/400/favorites/rel/1')
            .expect(401, done);
    });

    it('should let everyone see favorites', done => {

        api.get('/api/dndusers/400/favorites')
            .then(res => {
                assert.equal(res.body.length, 3, 'Wrong favorite count');
            })
            .then(done)
            .catch(done);
    });

});
