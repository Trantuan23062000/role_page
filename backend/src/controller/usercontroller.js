import userApiService from "../services/userapiSevirce";

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      //console.log(page,limit)
      let data = await userApiService.getUserPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.DT, //data
      });
    } else {
      let users = await userApiService.getListUser();
      return res.status(200).json({
        EM: users.EM, //error message
        EC: users.EC, //error code
        DT: users.DT, //data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const createFunc = async (req, res) => {
  try {
    let data = await userApiService.createUser(req.body)
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //data
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let users = await userApiService.Updateuser;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let data = await userApiService.DeleteUser(req.body.id)
    //console.log(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //data
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
