import ProductModule from "../Model/ProductSchema.js";

//create Product
export const createProduct = async (req, res) => {
   try {
    let product = await ProductModule.findOne({title:req.body.title});
    if(!product){
      const createdproduct= await ProductModule.create(req.body);
      res.status(200).json({message:"Product Create successful",createdproduct,rd:true});
    }else{
      res.status(400).json({message:"product already created",rd:false})
    }
   } catch (error) {
    res.status(500).json({ message: "internal server error", error,rd:false });
   }

};

//get All Product
export const getAllProduct = async (req, res) => {
  try {
    let product = await ProductModule.find();
    if (product) {
      res.status(200).json({ message: "Product Fetching successful", product ,rd:true});
    } else {
      res.status(404).json({ message: "Product List emty",rd:false });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error,rd:false });
  }
};

//get One Product
export const getOneProduct = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await ProductModule.findOne({ _id: id });
    if (product) {
      res.status(200).json({ message: "get product successful", product,rd:true });
    } else {
      res.status(404).json({ message: "Product Not matching",rd:false });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error,rd:false });
  }
};

//edit Product
export const editProduct = async (req, res) => {
try {
  const product=await ProductModule.findOne({_id:req.params.id})
  if(product){
    const {_id,title,description,category,image,price,rating,count}=req.body;
     product._id=_id;
     product.title=title;
     product.description=description;
     product.category=category;
     product.image=image;
     product.price=price;
     product.rating=rating;
     product.count=count;
     await product.save();
res.status(200).json({message:"product Edit Successful",product,rd:true});

  }else{
    res.status(404).json({message:" Product Not Matched",rd:false})
  }
} catch (error) {
  res.status(500).json({ message: "internal server error", error,rd:false });
}

};

//delete Product
export const deleteProduct = async (req, res) => {
 try {
    const id = req.params.id;
    const product =await ProductModule.findOneAndDelete({_id:id});
    res.status(200).json({message:"product Delete Successful",rd:true});

 } catch (error) {
    res.status(500).json({ message: "internal server error", error,rd:false });
 }
};
