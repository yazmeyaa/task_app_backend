import dotenv from 'dotenv'

dotenv.config()

type VariableType = 'number' | 'string'

function checkAndParseVariable(variable?: string, type?: VariableType) {
    if ('undefined' === typeof variable) throw new Error('Missing required variable')

    if (type === 'number') return Number(variable)
    if (type === 'string') return variable
    return variable

}


const {
    EXPRESS_PORT,
    JWT_SECRET_CODE,
    JWT_EXPRIRE_TIME,
    MYSQL_DATABASE,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_PASSWORD,
    MYSQL_USER
} = process.env

export const appConfig = {
    express: {
        port: checkAndParseVariable(EXPRESS_PORT, 'number') as number
    },
    jwt: {
        secret: checkAndParseVariable(JWT_SECRET_CODE, 'string') as string,
        expiresIn: checkAndParseVariable(JWT_EXPRIRE_TIME, 'string') as string
    },
    mysql: {
        host: checkAndParseVariable(MYSQL_HOST, 'string') as string,
        port: checkAndParseVariable(MYSQL_PORT, 'number') as number,
        database: checkAndParseVariable(MYSQL_DATABASE, 'string') as string,
        user: checkAndParseVariable(MYSQL_USER, 'string') as string,
        password: checkAndParseVariable(MYSQL_PASSWORD, 'string') as string
    }
}