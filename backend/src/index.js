import express from "express";
import initWedRoutes from "./routes/wed";
import viewEngineer from "./config/viewEnginer";
import bodyParser from "body-parser"
import connect from "./config/connect"
//import cors from "cors"
require("dotenv").config()
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())

viewEngineer(app);
initWedRoutes(app);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});



const PORT = process.env.PORT || 8081;
connect()


app.listen(PORT, () => {
  console.log("Server running:" + PORT);
});
