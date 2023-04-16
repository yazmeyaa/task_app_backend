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

type RequestBody = Pick<TaskInterface, 'title' | 'taskEndsAt' | 'description'>

interface ResponseBody {
    error?: string
    message?: string
    data?: TaskInterface
}

type TypedRequest = Request<ReqestParams, any, RequestBody>
type TypedResponse = Response<ResponseBody, AuthLocals>

export async function updateTaskById(req: TypedRequest, res: TypedResponse) {
    const { task_id } = req.params
    const { description, title, taskEndsAt } = req.body
    const { user_id } = res.locals.auth

    if (!description || !title) {
        return res.status(400).json({
            error: "Missed required fields in body"
        })
    }

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

        Task.update(task_id, { description, title, taskEndsAt })
        .then(() => {
            res.status(200).json({
                message: "Successful updated task"
            })
        })
    }
    catch (err) {
        return res.status(400).json({
            error: "Some error!"
        })
    }
}