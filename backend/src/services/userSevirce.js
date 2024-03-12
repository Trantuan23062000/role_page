import bcrypt from "bcryptjs";
// Get the client
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index"


// Create the connection to database

const salt = bcrypt.genSaltSync(10);

const HashUserPassword = (password) => {
  let hasPassword = bcrypt.hashSync(password, salt);
  return hasPassword;
};

const CreateUser = async (username, email, password) => {
  let hasPass = HashUserPassword(password);
      try {
        await db.User.create({
          username:username,
          email:email,
          password:hasPass

        })
        
      } catch (error) {
         console.log(error)
      }
};

const GetUserList = async () => {
  let users = []
  users = await db.User.findAll()
  return users

};

const GetUserById = async (id) => {
  let user = {}
  user = await db.User.findOne({
    where : {id}
  })
  //console.log(user.get({plain:true}));
  return user.get({plain:true})
  
};

const UpdateUser = async (email, username , id) => {
      await db.User.update({email, username },{
        where:{id}
      })
};

const DeleteUsers = async (id) => {
  await db.User.destroy({
    where:{id}
  })
};

module.exports = {
  CreateUser,
  GetUserList,
  DeleteUsers,
  GetUserById,
  UpdateUser,
};
