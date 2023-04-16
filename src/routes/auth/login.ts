import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "models/user";
import { checkRequiredFields } from "utils/checkRequestFields";
import { sql } from "utils/mysqlClient";
import jwt from 'jsonwebtoken'
import { appConfig } from "config/app_config";


interface RequestBody {
    username: string,
    password: string,
}

interface ResponseBody {
    error?: string
    message?: string
}

type TypedRequest = Request<any, any, RequestBody>
type TypedResponse = Response<ResponseBody>
const requiredFields: Array<keyof RequestBody> = ['password', 'username']

async function login(req: TypedRequest, res: TypedResponse) {
    const missedFields = checkRequiredFields(req.body, requiredFields)

    if (missedFields.length > 0) {
        return res.status(400).json({
            error: `Missed required field: ${missedFields.sort().join(', ')}`
        })
    }

    const User = new UserModel(sql)

    const { password, username } = req.body

    const findUser = await User.readByUserName(username)
    if (!findUser) {
        return res.status(403).json({
            error: "Wrong username or password"
        })
    }

    bcrypt.compare(password, findUser.password)
        .then(result => {
            if (result === false) {
                return res.status(403).json({
                    error: "Wrong username or password"
                })
            } else if (result === true) {

                const token = jwt.sign({ id: findUser.id }, appConfig.jwt.secret, {
                    expiresIn: appConfig.jwt.expiresIn
                })
                res.cookie('token', token, { httpOnly: true })
                return res.status(200).json({
                    message: "Successfull authorization",
                })
            }
        })

}

export { login }