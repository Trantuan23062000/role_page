import userSevirce from "../services/userSevirce";

const HandleHello = (req, res) => {
  return res.render("home.ejs");
};

const UserPage = async (req, res) => {
  let listUser = await userSevirce.GetUserList();
  //console.log(listUser);
  return res.render("user.ejs", { listUser });
};

const HadlecreateUser = (req, res) => {
  let username = req.body.username;
  let email = req.body.email; 
  let password = req.body.password;

  userSevirce.CreateUser(username, email, password);
  // //let check = bcrypt.compareSync(password,hasPassword)
  // console.log(">>>>",hasPassword);
  // console.log(">>",check);
  return res.redirect("/user");
};

const HadleDeleteUser = async (req, res) => {
  await userSevirce.DeleteUsers(req.params.id);
  return res.redirect("/user");
};

const getUpdateUser = async (req, res) => {
  let id = req.params.id;
  let user = await userSevirce.GetUserById(id);
  let userData = {}
  userData = user
  return res.render("user-update.ejs",{userData});
};

const HandleUpdateUser = async (req,res) =>{
  let email = req.body.email
  let username = req.body.username
  let id = req.body.id
  await userSevirce.UpdateUser(email,username,id)

  return res.redirect("/user")

}

module.exports = {
  HadlecreateUser,
  UserPage,
  HandleHello,
  HadleDeleteUser,
  getUpdateUser,
  HandleUpdateUser
};
