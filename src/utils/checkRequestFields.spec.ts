import { expect } from "chai";
import { describe, it } from "mocha";
import { checkRequiredFields } from "./checkRequestFields";

describe("utils", () => {
    describe("checkRequiredFields.ts", () => {
        it("Принимаем 'name', 'username', 'password', также ожидаем 'email'", () => {
            const req_body = { name: 'Oigen', username: 'yazmeyaa', password: 'super_strong_password' }
            const requiredFields = ['name', 'username', 'password', 'email']
            expect(['email']).to.deep.equal(checkRequiredFields(req_body, requiredFields))
        });
    });
});