const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/productsContr");
const { validateBody, isValidId, authenticate } = require("../../middlewars");
const { schemaJoi } = require("../../models/product");

router.get("/", ctrl.listProducts);

router.get("/:productId", isValidId, ctrl.getProductById);

router.post("/", validateBody(schemaJoi), ctrl.addProduct);

router.delete("/:productId", isValidId, ctrl.removeProduct);

router.put(
  "/:productId",
  isValidId,
  validateBody(schemaJoi),
  ctrl.updateProduct
);

module.exports = router;
