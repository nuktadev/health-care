import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createAdmin);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
