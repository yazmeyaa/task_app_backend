import { Request, Response, Locals } from "express";
import { TaskModel } from "models/task";
import { TaskInterface } from "types/task";
import { sql } from "utils/mysqlClient";

interface AuthLocals extends Locals {
    auth: {
        user_id: string
    }
}

interface RequestQuery {
    page: string
    perPage: string
}

interface ResponseBody {
    error?: string
    message?: string
    totalItems?: number
    totalPages?: number
    data?: TaskInterface[]
    page?: number
    perPage?: number
}

type TypedRequest = Request<any, any, any, RequestQuery>
type TypedResponse = Response<ResponseBody, AuthLocals>

export async function getTaskList(req: TypedRequest, res: TypedResponse) {
    const { page, perPage } = req.query

    const { user_id } = res.locals.auth

    const [parsedPage, parsedPerPage] = [page, perPage].map(Number)

    if (
        isNaN(parsedPage) ||
        isNaN(parsedPerPage)
    ) {
        return res.status(400).json({
            error: "Wrong query values."
        })
    }

    const Task = new TaskModel(sql)
    const totalItems = await Task.getTaskCount(user_id)
    const items = await Task.getList(user_id, {
        page: parsedPage,
        perPage: parsedPerPage
    })
    const totalPages = Math.ceil(totalItems / parsedPerPage)

    res.status(200).json({

        totalItems: totalItems,
        page: parsedPage <= 1 ? 1 : parsedPage - 1,
        perPage: parsedPerPage,
        totalPages: totalPages,
        data: items
    })
}