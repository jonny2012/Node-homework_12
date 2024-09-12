import { Router } from "express"; 
import Controller from "./Controller.js";

const router = new Router()

router.get("/packages", Controller.getAll )
router.get("/packages/:id", Controller.getOne)
router.post("/package", Controller.create)
router.put("/package/:id", Controller.updateOne)
router.delete("/package/:id", Controller.deleteOne)
router.put("/update-version/:id", Controller.updateVersion)



export {router}