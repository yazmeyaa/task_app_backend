import { Request, Response, Locals } from "express";
import { TaskModel } from "models/task";
import { TaskInterface } from "types/task";
import { sql } from "utils/mysqlClient";

interface AuthLocals extends Locals {
    auth: {
        user_id: string
    }
}

interface ReqestParams {
    task_id: string
}

interface ResponseBody {
    error?: string
    message?: string
    data?: TaskInterface
}

type TypedRequest = Request<ReqestParams>
type TypedResponse = Response<ResponseBody, AuthLocals>

export async function getTaskById(req: TypedRequest, res: TypedResponse) {
    const { task_id } = req.params
    const { user_id } = res.locals.auth

    const Task = new TaskModel(sql)

    try {
        const findedTask = await Task.readById(task_id)

        if (!findedTask) {
            return res.status(404).json({
                error: "Task not found"
            })
        }

        if (findedTask.userID !== user_id) {
            return res.status(403).json({
                error: "Access to this element is not allowed"
            })
        }

        return res.status(200).json({
            message: "Successfull finded task!",
            data: findedTask
        })
    }
    catch (err) {
        return res.status(400).json({
            error: "Some error!"
        })
    }
}