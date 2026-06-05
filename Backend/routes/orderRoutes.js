import express from "express";
import { getOrders, createOrder, getUserOrders, confirmOrder, deleteOrder } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/").get(protect, admin, getOrders);
router.route("/user/my-orders").get(protect, getUserOrders);
router.route("/:id/confirm").put(protect, admin, confirmOrder);
router.route("/:id").delete(protect, admin, deleteOrder);

export default router;
