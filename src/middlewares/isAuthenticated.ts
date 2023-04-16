import { appConfig } from "config/app_config";
import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from 'jsonwebtoken'

function checkAuth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if ('undefined' === typeof authorization) {
        return res.status(401).json({ error: "Missed authentication" })
    }
    const token = splitToken(authorization)
    try {
        const decoded = verify(token, appConfig.jwt.secret) as JwtPayload
        res.locals.auth = {
            user_id: decoded.id
        }
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({ error: "Wrong authentication" })
    }
}

function splitToken(header: string) {
    const [_, token] = header.split(' ')
    return token
}

export { checkAuth }