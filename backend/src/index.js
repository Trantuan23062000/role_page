import express from "express";
import initWedRoutes from "./routes/wed";
import viewEngineer from "./config/viewEnginer";
import bodyParser from "body-parser"
import connect from "./config/connect"
import apiRoutes from "./routes/api"
import cors from "cors"
import config from "./config/cors"
require("dotenv").config()
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

viewEngineer(app);
initWedRoutes(app);
apiRoutes(app)
config(app)

const PORT = process.env.PORT || 8081;
connect()


app.listen(PORT, () => {
  console.log("Server running:" + PORT);
});
