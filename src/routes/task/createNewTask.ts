import { Request, Response, Locals } from "express";
import { TaskModel } from "models/task";
import { TaskInterface } from "types/task";
import { sql } from "utils/mysqlClient";

interface AuthLocals extends Locals {
    auth: {
        user_id: string
    }
}

type RequestBody = Pick<TaskInterface, 'description' | 'title' | 'taskEndsAt'>

interface ResponseBody {
    error?: string
    message?: string
}

type TypedRequest = Request<any, any, RequestBody>
type TypedResponse = Response<ResponseBody, AuthLocals>

export async function createNewTask(req: TypedRequest, res: TypedResponse) {
    const { user_id } = res.locals.auth
    const { description, title, taskEndsAt } = req.body

    if (!description || !title) {
        return res.status(400).json({
            error: "Missed required fields"
        })
    }

    const Task = new TaskModel(sql)

    Task.create(user_id, req.body)
        .then(() => {
            return res.status(200).json({
                message: "Successfull created new task"
            })
        })

}