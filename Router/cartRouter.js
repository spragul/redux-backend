import express from 'express';
import { createCart, deletecart, editcart, getcart } from '../Controller/Cartcontroll.js';

const router =express.Router();

router.post('/create',createCart);
router.get('/list/:id',getcart);
router.put('/edit/:id',editcart);
router.delete('/delete/:id',deletecart);
export default router;