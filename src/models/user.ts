import { Connection, OkPacket, RowDataPacket } from "mysql2"
import { User } from "types/user"



type UserDB = User & RowDataPacket

class UserModel {
    private sql: Connection

    constructor(mySQLConnection: Connection) {
        this.sql = mySQLConnection
    }

    readById(id: string) {
        const row = 'SELECT * FROM User WHERE id=?'

        return new Promise<UserDB>((resolve, reject) => {
            this.sql.query<UserDB[]>(row, [id], (err, result) => {
                if (err) reject(err)
                else resolve(result[0])
            })
        })
    }

    readByUserName(username: string) {
        const row = 'SELECT * FROM User WHERE username=?'

        return new Promise<UserDB>((resolve, reject) => {
            this.sql.query<UserDB[]>(row, [username], (err, result) => {
                if (err) reject(err)
                else resolve(result[0])
            })
        })
    }

    readByEmail(email: string) {
        const row = 'SELECT * FROM User WHERE email=?'

        return new Promise<UserDB>((resolve, reject) => {
            this.sql.query<UserDB[]>(row, [email], (err, result) => {
                if (err) reject(err)
                else resolve(result[0])
            })
        })
    }

    create(taskProps: Pick<User, 'email' | 'password' | 'username'>) {
        const { email, password, username } = taskProps
        const row = 'INSERT INTO User (email, password,  username) VALUES (?, ?, ?)'

        return new Promise<OkPacket>((resolve, reject) => {
            this.sql.query<OkPacket>(row, [email, password, username], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    update(id: string, data: Pick<User, 'email' | 'password' | 'username'>) {
        const { email, password, username } = data
        const row = `UPDATE User SET username=?, email=?, password=? WHERE id=?`
        const values = [username, email, password, id]
        return new Promise<OkPacket>((resolve, reject) => {

            this.sql.query<OkPacket>(row, values, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    delete(id: string) {
        const row = 'DELETE FROM User WHERE id=?'
        const values = [id]

        return new Promise<OkPacket>((resolve, reject) => {
            this.sql.query<OkPacket>(row, values, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }
}

export { UserModel }