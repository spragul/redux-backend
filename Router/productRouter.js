import express from 'express';
import { createProduct, deleteProduct, editProduct, getAllProduct, getOneProduct } from '../Controller/Productcontroll.js';
import { rolebasedAuthentication } from '../Authentication/auth.js';
const router =express.Router();

router.post('/create',rolebasedAuthentication,createProduct);
router.get('/allproduct',getAllProduct);
router.get('/oneproduct/:id',getOneProduct);
router.put('/edit/:id',rolebasedAuthentication,editProduct);
router.delete('/delete/:id',rolebasedAuthentication,deleteProduct);
export default router;