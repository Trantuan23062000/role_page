import express from "express";

/**
 * 
 * @param {*} app 
 */

const viewEngineer = (app) =>{
    app.use(express.static('./src/public'))
    app.set("view Engineer","./src/views")
    app.set("views","./src/views")
}

export default viewEngineer