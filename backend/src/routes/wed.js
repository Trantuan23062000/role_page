import express from "express";
import homecontroller from "../controller/homecontroller";
import apiController from "../controller/apicontroller"

/**
 *
 * @param {*} app
 */
const router = express.Router()
const initWedRoutes = (app) => {
  router.get("/", homecontroller.HandleHello)

  router.get("/user", homecontroller.UserPage)

  router.post("/users/create-user", homecontroller.HadlecreateUser)
  router.post("/delete-user/:id", homecontroller.HadleDeleteUser)
  router.get("/update-user/:id",homecontroller.getUpdateUser)
  router.post("/user/update-user",homecontroller.HandleUpdateUser)


  //api restfull api CRUD

  router.get("/api/test",apiController.testApi)





  return app.use("/", router);
};

export default initWedRoutes;
