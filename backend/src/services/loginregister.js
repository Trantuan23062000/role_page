import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashUSerPassword = (userPassword) => {
  let hassPassword = bcrypt.hashSync(userPassword, salt);
  return hassPassword;
}

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  })

  if (user) {
    return true;
  }

  return false;
}

const checkPhoneExits = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  })

  if (user) {
    return true
  }
  return false
}

const registerUser = async (rawUserData) => {
  try {
    let isExitsEmail = await checkEmailExist(rawUserData.email);
    //console.log(isExitsEmail);
    if (isExitsEmail === true) {
      return {
        EM: "Email is already exist",
        EC: 1,
      }
    }

    let isExitsPhone = await checkPhoneExits(rawUserData.phone);
    if (isExitsPhone === true) {
      return {
        EM: "The phone number is already exist",
        EC: 1,
      }
    }

    let hashPassword = hashUSerPassword(rawUserData.password);
    await db.User.create({
      username: rawUserData.username,
      email: rawUserData.email,
      phone: rawUserData.phone,
      password: hashPassword,
    })

    return {
      EM: "A user create user succecssfully",
      EC: 0,
      DT: "",
    }
  } catch (error) {
    console.log(error)
    return {
      EM: "Something wrongs in servirce...",
      EC: -2,
    }
  }
}

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
}

const handleUserLogin = async (rawUserData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawUserData.valueLogin },
          { phone: rawUserData.valueLogin },
        ],
      },
    });
    // console.log(">> check user :",user.get({plain:true}))
    // console.log(">> check user :",user)

    if (user) {
      let isCorrectPassword = checkPassword(
        rawUserData.password,
        user.password
      )
      if (isCorrectPassword === true) {
        return {
          EM: "Login succesfully",
          EC: 0,
          DT: "",
        }
      }
    }
   // console.log(">> Not found user with email/phone: ", rawUserData.valueLogin,"Password",rawUserData.password);
    return {
      EM: "Your email/phone number or password is incorrect !",
      EC: 1,
      DT: "",
    }
  } catch (error) {
    return {
      EM: "Something wrongs in servirce...",
      EC: -2,
    };
  }
}

module.exports = {
  registerUser,
  handleUserLogin,
  hashUSerPassword,checkEmailExist,checkPassword,checkPhoneExits
};
