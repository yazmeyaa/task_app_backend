import request from 'supertest'
import { app } from 'index'
import { describe, it, test } from 'mocha'
import {expect} from 'chai'

describe("/api/task [POST]", () => {
    it("With no authorization", () => {
        request(app)
        .post('/api/task')
        .expect('Content-Type', /json/)
        .expect(401)
    })
})