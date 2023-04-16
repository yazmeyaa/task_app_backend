import { Request, Response } from "express";

function handle404(_: Request, res: Response) {
    res.status(404).json({
        error: "Route not found"
    })
}

export { handle404 }