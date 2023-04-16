import { TaskInterface } from "types/task";
import { Connection, OkPacket, RowDataPacket } from 'mysql2'

interface TaskListParams {
    page: number,
    perPage: number
}

type TaskInterfaceDB = TaskInterface & RowDataPacket

interface TaskCount {
    count: number
}
type TaskCountResultType = TaskCount & RowDataPacket

type TaskProps = Pick<TaskInterface, 'title' | 'description' | 'taskEndsAt'>

class TaskModel {
    private sql: Connection

    constructor(mySQLConnection: Connection) {
        this.sql = mySQLConnection
    }

    create(user_id: string, taskProps: TaskProps) {
        const { title, description, taskEndsAt } = taskProps
        const row = 'INSERT INTO Task (userID, title, description, taskEndsAt) VALUES (?, ?, ?, ?)'

        return new Promise<OkPacket>((resolve, reject) => {
            this.sql.query<OkPacket>(row, [user_id, title, description, taskEndsAt], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    readById(task_id: string) {
        const row = 'SELECT * FROM Task WHERE id=?'

        return new Promise<TaskInterface>((resolve, reject) => {
            this.sql.query<TaskInterfaceDB[]>(row, [task_id], (err, result) => {
                if (err) reject(err)
                else resolve(result[0])
            })
        })
    }

    update(task_id: string, taskProps: TaskProps) {
        const { description, title, taskEndsAt } = taskProps
        const row = 'UPDATE Task SET title=?, description=?, taskEndsAt=? WHERE id=?'
        const values = [title, description, taskEndsAt, task_id]
        return new Promise<OkPacket>((resolve, reject) => {
            this.sql.query<OkPacket>(row, values, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    getTaskCount(user_id: string) {
        const row = 'SELECT COUNT(*) as count FROM Task WHERE userID=?;'

        return new Promise<number>((resolve, reject) => {
            this.sql.query<TaskCountResultType[]>(row, [user_id], (err, result) => {
                if (err) reject(err)
                else resolve(result[0].count)
            })
        })
    }

    getList(user_id: string, params: TaskListParams) {
        let { page, perPage } = params
        page -= 1
        const row = 'SELECT * FROM Task WHERE userID = ? LIMIT ? OFFSET ?'

        return new Promise<TaskInterface[]>((resolve, reject) => {
            this.sql.query<TaskInterfaceDB[]>(row, [user_id, perPage, (page * perPage),], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    delete(task_id: string) {
        const row = 'DELETE FROM Task WHERE id=?'
        const values = [task_id]
        return new Promise<OkPacket>((resolve, reject) => {
            this.sql.query<OkPacket>(row, values, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }
}

export { TaskModel }