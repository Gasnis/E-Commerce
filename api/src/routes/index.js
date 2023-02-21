const { Router } = require("express");
const userRouter = require("./userRoutes/user.route");
const bulkRouter = require("./bulkRoute/bulk.route");
const productRouter = require("./productRoute/product.route");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/user", userRouter);
router.use("/bulk", bulkRouter);
router.use("/products", productRouter);

module.exports = router;
