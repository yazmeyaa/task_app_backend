import { compare } from 'bcrypt'
import { appConfig } from 'config/app_config'
import express from 'express'
import { handle404 } from 'middlewares/404'
import { checkAuth } from 'middlewares/isAuthenticated'
import { authRouter } from 'routes/auth'
import { taskRouter } from 'routes/task'

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

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/api/task', checkAuth, taskRouter)
app.use('/auth/', authRouter)


// If route doesn't exist
app.use(handle404)
