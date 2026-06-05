import express from "express";
import { authAdmin, setupAdmin, registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin routes
router.post("/admin/login", authAdmin);
router.post("/setup", setupAdmin); // Call this once to create the initial admin

export default router;
