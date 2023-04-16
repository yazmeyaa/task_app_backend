import { appConfig } from "config/app_config";
import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from 'jsonwebtoken'

function checkAuth(req: Request, res: Response, next: NextFunction) {
    const clientToken = req.cookies['token']
    console.log(clientToken)
    if ('undefined' === typeof clientToken) {
        return res.status(401).json({ error: "Missed authentication" })
    }
    try {
        const decoded = verify(clientToken, appConfig.jwt.secret) as JwtPayload
        res.locals.auth = {
            user_id: decoded.id
        }
        next()
    }
    catch (err) {
        return res.status(401).json({ error: "Wrong authentication" })
    }
}

export { checkAuth as isAuthenticated }