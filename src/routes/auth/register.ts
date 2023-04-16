import { Request, Response } from "express";
import { checkRequiredFields } from "utils/checkRequestFields";
import { genSalt, hash } from 'bcrypt'
import { UserModel } from "models/user";
import { sql } from "utils/mysqlClient";


interface RequestBody {
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
}

interface ResponseBody {
    error?: string
    message?: string
}

type TypedRequest = Request<any, any, RequestBody>
type TypedResponse = Response<ResponseBody>

const requiredFields: Array<keyof RequestBody> = ['confirmPassword', 'email', 'password', 'username']

export async function register(req: TypedRequest, res: TypedResponse) {
    const missedFields = checkRequiredFields(req.body, requiredFields)

    if (missedFields.length > 0) {
        return res.status(400).json({
            error: `Missed required field: ${missedFields.sort().join(', ')}`
        })
    }


    const User = new UserModel(sql)

    const {
        confirmPassword,
        password,
        email,
        username,
    } = req.body



    const isEmailNotAvailable = await User.readByEmail(email)
    const isUsernameNotAvailable = await User.readByUserName(username)

    if (confirmPassword !== password) {
        return res.status(400).json({
            error: "Mismatch passwords"
        })
    }

    if (isEmailNotAvailable) {
        return res.status(403).json({
            error: "This email address is not available"
        })
    }
    if (isUsernameNotAvailable) {
        return res.status(403).json({
            error: "This username address is not available"
        })
    }

    genSalt(10, 'a', (err, salt) => {
        if (err) return res.status(400).json({
            error: "Server error. Try again later"
        })
        hash(password, salt, (err, hash) => {
            if (err) return res.status(400).json({
                error: "Server error. Try again later"
            })
            User.create({
                email,
                username,
                password: hash,
            })
                .then(() => {
                    return res.status(200).json({
                        message: "Successfull registered!",
                    })
                })
        })
    })

}