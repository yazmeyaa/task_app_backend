import { Locals, Request, Response } from "express";

interface AuthLocals extends Locals {
    auth: {
        user_id: string
    }
}

type TypedResponse = Response<any, AuthLocals>

function chekcAuth(_: Request, res: TypedResponse) {
    const { auth } = res.locals
    if (auth) return res.status(200).json({ message: 'OK' })
    else return res.status(400).json({ error: 'Wrong authorization' })
}

export { chekcAuth }