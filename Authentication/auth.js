import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//hash password
export const hashpassword = async (givenpassword) => {
  const salt = await bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hash(givenpassword, salt);
  return hashedpassword;
};

//comar password
export const comparepassword = async (hashedpassword, password) => {
  const comparedpassword = await bcrypt.compare(password, hashedpassword);
  return comparedpassword;
};
//create token
export const createtoken = async (payload, expiresIntime) => {
  let token = await jwt.sign(
    {
      data: payload,
    },
    process.env.secret,
    { expiresIn: expiresIntime }
  );
  return token;
};

//token exper check
export const validate = async (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    if (token!=="null") {
      let data = await jwt.decode(token);
      if (Math.floor(+new Date() / 1000) < data.exp) {
        next();
      } else {
        res.status(401).json({ message: "Token Expired", rd: false });
      }
    } else {
      res.status(400).json({ message: "Token not found", rd: false });
    }
  } else {
    res.status(400).json({ message: "Token not found", rd: false });
  }
};

//verfy token reset password
export const verifytoken = async (token) => {
  try {
    let data = await jwt.decode(token);
    if (Math.floor(+new Date() / 1000) < data.exp) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//Role based Authentation

export const rolebasedAuthentication = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      let data = await jwt.decode(token);
      if (Math.floor(+new Date() / 1000) < data.exp) {
        if (data.data.role === "admin") {
          next();
        } else {
          res
            .status(404)
            .send({ message: "Admin one use this page", rd: false });
        }
      } else {
        res.status(401).send({ message: "Token Expired", rd: false });
      }
    } else {
      res.status(400).send({ message: "Token not found", rd: false });
    }
  } catch (error) {
    res.status(400).send({ message: "Token not found", rd: false });
  }
};
