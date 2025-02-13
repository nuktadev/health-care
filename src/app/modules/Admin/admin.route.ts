import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.get("/", AdminController.getAllFromDb);
router.get("/:id", AdminController.getAdminById);
router.patch(
  "/:id",
  validateRequest(AdminValidation.updateAdminValidation),
  AdminController.updateAdmin
);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteFromDBAdmin);

export const AdminRoutes = router;
