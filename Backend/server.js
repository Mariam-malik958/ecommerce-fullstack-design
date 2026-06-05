import "./config/env.js";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import User from "./models/User.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS set:", !!process.env.EMAIL_PASS);
});

async function fixAdminAccount() {
  try {
    const adminEmail = "admin@gmail.com";

    await User.deleteMany({ email: adminEmail });

    await User.create({
      name: "Admin",
      email: adminEmail,
      password: "admin1234",
      isAdmin: true,
    });

    console.log("\n=========================================================");
    console.log("👉 SUCCESS: Admin Account has been Reset/Created!");
    console.log(`👉 Email: ${adminEmail}`);
    console.log("👉 Password: admin1234");
    console.log("=========================================================\n");

  } catch (error) {
    console.log("❌ Admin Reset Error:", error.message);
  }
}

setTimeout(fixAdminAccount, 4000);