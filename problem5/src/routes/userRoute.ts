import * as express from 'express'
import {Request, Response} from 'express'
import {User} from '../models/user.model'
import {createUserValidation, updateUserValidation, handleValidationErrors, mongoIdValidation} from './validation'


const router = express.Router();

//Post Method
router.post('/', createUserValidation, handleValidationErrors, async (req: Request, res: Response) => {
    //@TO-DO: Validation
    const {name, age} = req.body

    try {
        const user = await User.build({ name, age })
        await user.save()
        res.status(201).json(user)
    }
    catch (error) {
        res.status(500).json({ message: 'Server error while creating user.' });
    }
})

//Get Method
router.get('/', async (req: Request, res: Response) => {
    const filter = {}
    const keys = Object.keys(req.query);

    for (let key of keys) {
        filter[key] = req.query[key];
    }

    try {
        const users = await User.find(filter).lean()
        res.status(201).json(users)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get By Id Method
router.get('/:id', mongoIdValidation, handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        let user = await User.findById(id).lean()
        res.status(201).json(user)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update Method
router.patch('/:id', mongoIdValidation, updateUserValidation, handleValidationErrors, async (req: Request, res: Response) => {
    //@TO-DO: Validation
    try {
        const id = req.params.id
        let user = await User.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json(user)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Post Method
router.delete('/:id', mongoIdValidation, handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        res.status(201).json(`User ${user.id} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export {router as userRoute}