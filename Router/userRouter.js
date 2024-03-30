import express from "express"
import { createuser, deleteuser, forgotpassword, getAllUser, login, oneUser, resetpassword } from "../Controller/usercontroll.js";
import { rolebasedAuthentication, validate } from "../Authentication/auth.js";
const router=express.Router();

router.post('/signup',createuser)
router.get('/',rolebasedAuthentication,getAllUser);
router.get('/:id',validate,oneUser);
router.post('/login',login);
router.delete('/delete/:id',rolebasedAuthentication,deleteuser);
router.post('/forgotpassword',forgotpassword)
router.put('/reset',resetpassword)


export default router