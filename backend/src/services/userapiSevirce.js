import db from "../models/index";
import {checkEmailExist,checkPhoneExits,hashUSerPassword} from '../services/loginregister'
const getListUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
      nest: true,
    });

    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Something wrongs with servies",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "Something wrongs with servies",
      EC: 1,
      DT: [],
    };
  }
};

const getUserPagination = async (page,limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes:["id","username","email","phone","sex","adress"],
      include:{model:db.Group,attributes:["name","description","id"]},
      order:[['id','DESC']]
      //sort:''
    });
    let totalPages = Math.ceil(count/limit)

    let data = {
      totalRows : count,
      totalPages:totalPages,
      users:rows
    }
    //console.log(offset,limit)
    //console.log(data)

    return {
      EM: "OK",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    return {
      EM: "Something wrongs with servies",
      EC: 1,
      DT: [],
    };
  }
};

const createUser = async (data) => {
  let isExitsEmail = await checkEmailExist(data.email);
  //console.log(isExitsEmail);
  if (isExitsEmail === true) {
    return {
      EM: "Email is already exist",
      EC: 1,
      DT:'email'
    }
  }

  let isExitsPhone = await checkPhoneExits(data.phone);
  if (isExitsPhone === true) {
    return {
      EM: "The phone number is already exist",
      EC: 1,
      DT:'phone'
    }
  }

  let hashPassword = hashUSerPassword(data.password);
  try {
    await db.User.create({...data,password:hashPassword})
    return {
      EM: "OK",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
  }
};

const Updateuser = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const DeleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where:{id:id}
    })
    if(user){
      await user.destroy(id)
    }
    return {
      EM: "OK delete",
      EC: 0,
      DT: user,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getListUser,
  createUser,
  Updateuser,
  DeleteUser,
  getUserPagination,
};
