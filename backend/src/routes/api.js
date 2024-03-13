import express from "express";
import apiController from "../controller/apicontroller"

/**
 *
 * @param {*} app
 */
const router = express.Router()
const apiRoutes = (app) => {
  
  router.get("/test-api",apiController.testApi)
  router.post("/register",apiController.handleRegister)
  router.post("/login",apiController.handleLogin)


  return app.use("/api/v1", router);
};

export default apiRoutes;
