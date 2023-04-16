import { appConfig } from 'config/app_config'
import express from 'express'

const app = express()

const PORT = appConfig.express.port

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`Server successfull started at port ${PORT}`)
        })
    }
    catch (err) {
        if (err instanceof Error) console.log(err.message)
        else console.log(err)
    }
}

startServer()