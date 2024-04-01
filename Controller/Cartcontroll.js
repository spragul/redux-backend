import UserModel from "../Model/UserSchema.js";
import CartModule from "../Model/cartSchema.js";

//create cart
export const createCart = async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.body.userid });
    if (user) {
      let cart = await CartModule.findOne({ title: req.body.title });
      if (!cart) {
        const createdcart = await CartModule.create(req.body);
        res
          .status(200)
          .json({ message: "cart Create successful", createdcart, rd: true });
      } else {
        res.status(400).json({ message: "cart already created", rd: false });
      }
    } else {
      res.status(400).json({ message: "cart user not valid", rd: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error, rd: false });
  }
};

//get One cart
export const getcart = async (req, res) => {
  try {
    const cart = await CartModule.find({userid:req.params.id});
    console.log(cart)
    if (cart) {
      res.status(200).json({ message: "get cart successful", cart, rd: true });
    } else {
      res.status(400).json({ message: "cart Data emtpy", rd: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error, rd: false });
  }
};

//edit cart
export const editcart = async (req, res) => {
  try {
    const cart = await CartModule.findOne({ _id: req.params.id });
    if (cart) {
      const {
        _id,
        title,
        description,
        category,
        image,
        price,
        rating,
        numberofproduct,
        userid,
      } = req.body;
      cart._id = _id;
      cart.title = title;
      cart.description = description;
      cart.category = category;
      cart.image = image;
      cart.price = price;
      cart.rating = rating;
      cart.numberofproduct = numberofproduct;
      cart.userid = userid;
      await cart.save();
      res.status(200).json({ message: "cart Edit Successful", cart, rd: true });
    } else {
      res.status(404).json({ message: " cart Not Matched", rd: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error, rd: false });
  }
};

//delete cart
export const deletecart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await CartModule.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "cart Delete Successful", rd: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error, rd: false });
  }
};
