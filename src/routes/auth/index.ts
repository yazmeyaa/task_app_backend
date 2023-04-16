import { Router } from 'express'
import { register } from './register'
import { login } from './login'
import { chekcAuth } from './checkAuth'
import { isAuthenticated } from 'middlewares/isAuthenticated'

const router = Router()

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/check_auth').get(isAuthenticated, chekcAuth)

export { router as authRouter }