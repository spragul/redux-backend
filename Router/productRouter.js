import express from 'express';
import { createProduct, deleteProduct, editProduct, getAllProduct, getOneProduct } from '../Controller/Productcontroll.js';
import { rolebasedAuthentication, validate } from '../Authentication/auth.js';
const router =express.Router();

router.post('/create',rolebasedAuthentication,createProduct);
router.get('/allproduct',validate,getAllProduct);
router.get('/oneproduct/:id',validate,getOneProduct);
router.put('/edit/:id',rolebasedAuthentication,editProduct);
router.delete('/delete/:id',rolebasedAuthentication,deleteProduct);
export default router;