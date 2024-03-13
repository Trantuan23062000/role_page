import loginregisterServer from "../services/loginregister";
const testApi = (req, res) => {
  return res.status(200).json({
    message: "Ok",
    data: "test api",
  });
};

const handleRegister = async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: "Missing required paraments",
        EC: "1",
        DT: "",
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letter",
        EC: 1,
        DT: "",
      });
    }

    let data = await loginregisterServer.registerUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });

    //console.log(">>>",req.body);
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    //console.log("check login from react", req.body);
    let data = await loginregisterServer.handleUserLogin(req.body);
    return res.status(200).json({
      EM:data.EM, //error message
      EC:data.EC, //error code
      DT:data.DT, //data
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    
    })
  }
}

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
