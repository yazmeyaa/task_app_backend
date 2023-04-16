import { Router } from 'express'
import { getTaskList } from './getTaskList'
import { createNewTask } from './createNewTask'
import { getTaskById } from './getTaskById'
import { deleteTaskById } from './deleteTaskById'
import { updateTaskById } from './updateTaskById'

const router = Router()



router.route('/list')
    .get(getTaskList)

router.route('/')
    .post(createNewTask)

router.route('/:task_id')
    .get(getTaskById)
    .delete(deleteTaskById)
    .patch(updateTaskById)


export { router as taskRouter }