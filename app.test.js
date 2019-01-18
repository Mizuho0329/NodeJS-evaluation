//utilisation via commande npm run serve

import supertest from 'supertest'
import app from './app'
import db from './db'
import axios from 'axios'

// remise à vide de la db
function reset() {
    db.set('results', []).write()
}

// setup : avant chaque test, les mocks sont réinitialisés sinon le premier appel est valide pour tous les tests
beforeEach(jest.restoreAllMocks)

//à la fin de tous les tests, la base de données est reset
afterAll(reset)



describe('api.js', () => {
    // avant chaque test, la base de données est reset
    beforeEach(reset)


    //suppression 1 enregistrement
    test('DELETE /delete/:id', done => {
        // insertion de données en base
        db.get('results')
            .push({ id: 1547824318370, id_source: "58e00be30aac31001185edfe", fact: "Cats use their whiskers to detect if they can fit through a space." })
            .write()
        // appel à la route
        supertest(app)
            .delete('/api/delete/1547824318370')
            .expect(204, {})
            .expect(() => {
                const result = db.get('results').find({ id: 1547824318370 }).value()
                expect(result).toBeUndefined()
            })
            .end(done)
    })

    //suppression 1 enregistrement id unknown
    test('DELETE /delete/:id inconnu', done => {
        // insertion de données en base
        db.get('results')
            .push({ id: 1547824318370, id_source: "58e00be30aac31001185edfe", fact: "Cats use their whiskers to detect if they can fit through a space." })
            .write()
        // appel à la route
        supertest(app)
            .delete('/api/delete/1245')  //valeur inexistante
            .expect(204, {})
            .end(done)
    })


    //contrôle
    test('GET /all', done => {
        // insertion de données en base
        db.get('results')
            .push({ id: 1547824318370, id_source: "58e00be30aac31001185edfe", fact: "Cats use their whiskers to detect if they can fit through a space." })
            .push({ id: 1547824329287, id_source: "58e009390aac31001185ed10", fact: "Cats are often lactose intolerant, so stop givin' them milk!"})
            .write()

        supertest(app)
            .get('/api/all')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toStrictEqual([
                    { id: 1547824318370, id_source: "58e00be30aac31001185edfe", fact: "Cats use their whiskers to detect if they can fit through a space." },
                    { id: 1547824329287, id_source: "58e009390aac31001185ed10", fact: "Cats are often lactose intolerant, so stop givin' them milk!"}
                ])
            })
            .end(done)
    })


})