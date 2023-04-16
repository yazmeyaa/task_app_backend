import { expect } from "chai";
import { describe, it } from "mocha";
import { checkRequiredFields } from "../checkRequestFields";

describe("utils", () => {
    describe("checkRequiredFields.ts", () => {
        it("Принимаем 'name', 'username', 'password', также ожидаем 'email'", () => {
            const req_body = { name: 'Oigen', username: 'yazmeyaa', password: 'super_strong_password' }
            const requiredFields = ['name', 'username', 'password', 'email']
            expect(['email']).to.deep.equal(checkRequiredFields(req_body, requiredFields))
        });

        it("undefined на входе функции. На входе ожидается name, username, password, email", () => {
            const req_body = undefined
            const requiredFields = ['name', 'username', 'password', 'email']
            expect(['name', 'username', 'password', 'email']).to.deep.equal(checkRequiredFields(req_body, requiredFields))
        })

        it("Избыточное количество полей", () => {
            const req_body = { name: 'Oigen', username: 'yazmeyaa', password: 'super_strong_password', email: 'someemail@a.a', birthdate: '14.06.1998', anotherOneField: 'Hello world!' }
            const requiredFields = ['name', 'username', 'password', 'email']
            expect([]).to.deep.equal(checkRequiredFields(req_body, requiredFields))
        })
    });
});