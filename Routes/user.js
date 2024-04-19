import {  deletedUser, getUser, getUsers, replaceUser, updateUser } from "../Controller/user.js";
import express from 'express'
export const userRouter=express.Router()
userRouter
.get('/',getUsers)
.get('/:_id',getUser)
.put('/:_id',replaceUser)
.patch('/:_id',updateUser)
.delete('/:_id',deletedUser)