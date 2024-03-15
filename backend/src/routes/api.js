import express from "express";
import apiController from "../controller/apicontroller"
import userController from "../controller/usercontroller"

/**
 *
 * @param {*} app
 */
const router = express.Router()
const apiRoutes = (app) => {
  
  router.get("/test-api",apiController.testApi)
  router.post("/register",apiController.handleRegister)
  router.post("/login",apiController.handleLogin)

  router.get("/user/read",userController.readFunc)
  router.post("user/create",userController.createFunc)
  router.put("/user/upadate",userController.updateFunc)
  router.delete("/user/delete",userController.deleteFunc)


  return app.use("/api/v1", router);
};

export default apiRoutes;
