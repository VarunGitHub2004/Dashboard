import { signin, signup } from '../Controller/auth.js'
import express from 'express'
export const authRouter=express.Router()
authRouter.post('/signup',signup)
authRouter.post('/signin',signin)


