import { appConfig } from 'config/app_config'
import { createConnection } from 'mysql2'

const { database, host, port, password, user } = appConfig.mysql

const sql = createConnection({
    host,
    user,
    database,
    port,
    password
})

export { sql }