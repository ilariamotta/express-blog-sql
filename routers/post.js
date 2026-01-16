import express from "express";
import posts from "../data.js";
import { controller } from "../controllers/postController.js";

const router = express.Router();



//INDEX

router.get("/", controller.index) 

//SHOW

// router.get("/:id", controller.show)

router.get("/:id", controller.showPostWithTags)


// STORE

router.post("/", controller.store)

// UPDATE

router.put("/:id", controller.update)

// MODIFY

router.patch("/:id", controller.modify)

// DESTROY

router.delete("/:id", controller.destroy)

export default router