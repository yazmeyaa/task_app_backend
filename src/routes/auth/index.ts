import { Router } from 'express'
import { register } from './register'
import { login } from './login'

const router = Router()

router.route('/login').post(login)


router.route('/register').post(register)

export { router as authRouter }