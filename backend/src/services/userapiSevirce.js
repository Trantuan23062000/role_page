import db from "../models/index";

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
      attributes:["id","username","email","phone","sex"],
      include:{model:db.Group,attributes:["name","description"]}
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
  try {
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
