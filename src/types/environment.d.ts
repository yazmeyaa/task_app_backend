export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EXPRESS_PORT?: string
            JWT_SECRET_CODE?: string,
            JWT_EXPRIRE_TIME?: string,
            MYSQL_HOST?: string
            MYSQL_PORT?: string
            MYSQL_DATABASE?: string
            MYSQL_USER?: string
            MYSQL_PASSWORD?: string
        }
    }
}