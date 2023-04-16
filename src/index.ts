import { appConfig } from 'config/app_config'
import express from 'express'
import { handle404 } from 'routes/404'
import { isAuthenticated } from 'middlewares/isAuthenticated'
import { authRouter } from 'routes/auth'
import { taskRouter } from 'routes/task'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express()

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

const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true
}

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/api/task', isAuthenticated, taskRouter)
app.use('/auth/', authRouter)


// If route doesn't exist
app.use(handle404)
