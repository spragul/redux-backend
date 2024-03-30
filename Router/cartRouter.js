import express from 'express';
import { createCart, deletecart, editcart, getcart } from '../Controller/Cartcontroll.js';
import { validate } from '../Authentication/auth.js';

const router =express.Router();

router.post('/create',validate,createCart);
router.get('/list/:id',validate,getcart);
router.put('/edit/:id',validate,editcart);
router.delete('/delete/:id',validate,deletecart);
export default router;