import { createtoken, hashpassword, verifytoken,comparepassword } from "../Authentication/auth.js";
import { sendmailuser } from "../Authentication/nodemailer.js";
import UserModel from "../Model/UserSchema.js";

//create user
export const createuser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({ message: "User Allready Created", rd: true });
    } else {
      const hashedpassword = await hashpassword(req.body.password);
      req.body.password = hashedpassword;
      let newuser = await UserModel.create(req.body);
      if (newuser._id) {
        res
          .status(200)
          .json({ message: "User Register successfull", rd: true });
      } else {
        res.status(400).json({ message: "Try again later", rd: false });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error, rd: false });
    console.log(error);
  }
};
//signup user
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    const expiresIntime = "2h";
    if (user) {
      if (await comparepassword(user.password, req.body.password)) {
        let token = await createtoken(
          {
            _id:user._id,
            name: user.name,
            email: user.email,
            role:user.role
          },
          expiresIntime
        );
        if (token) {
          res.status(200).json({
            message: "Login successful",
            token,
            myid: user._id,
            myname: user.name,
            myRole: user.role,
            rd:true
          });
        }
      }
      
    } else {
      res.status(400).json({ message: "Invalide credentials", rd: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error, rd: false });
    console.log(error);
  }
};

//delete user
export const deleteuser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (user) {
      await UserModel.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Delete user Successful", rd: true });
    } else {
      res.status(204).json({ message: "User List is Empty", rd: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error, rd: false });
    console.log(error);
  }
};

//get all user
export const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find({}, { password: 0 });
    if (user) {
      res
        .status(200)
        .json({ message: "Get All user Successful", user, rd: true });
    } else {
      res.status(204).json({ message: "User List is Empty", rd: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error, rd: false });
    console.log(error);
  }
};

//get one user
export const oneUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (user) {
      res
        .status(200)
        .json({ message: "Get user Deatils Successful", user, rd: true });
    } else {
      res.status(404).json({ message: "Invalide Id", rd: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error, rd: false });
    console.log(error);
  }
};

//forgotpassword
export const forgotpassword = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    let expiresIntime = "10m";
    if (!user) {
      res.send({ rd: false, message: "user not exists" });
    } else {
      const token = await createtoken(
        {
          email: user.email,
          id: user._id,
        },
        expiresIntime
      );
      console.log(token, user._id);
      const link = `${process.env.frontendurl}/resetpassword/${user._id}/${token}`;
      let email = user.email;
      let data = await sendmailuser(email, link);
      console.log(data, email, link);
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ rd: false, message: `Internal server error.\n\n${error}` });
  }
};
//resetpassword
export const resetpassword = async (req, res) => {
  const { id, token } = req.params;
  try {
    const olduser = await UserModel.findOne({ _id: id });
    if (!olduser) {
      res.status(404).json({ rd: true, message: "user not exists" });
    } else {
      if (verifytoken(token)) {
        const encryptedPassword = await hashpassword(req.body.password);
        await UserModel.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              password: encryptedPassword,
            },
          }
        );
        res.status(200).json({
          message: "password reset",
          rd: true,
        });
      } else {
        res.status(400).json({message:"token Expried again go forgot password Note:token onely 10mints valid",rd:true})
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong",error, rd: false });
  }
};
