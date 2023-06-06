const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/productsContr");
const { validateBody, isValidId, authenticate } = require("../../middlewars");
const { schemaJoi, updateFavoriteSchemaJoi } = require("../../models/product");

router.get("/", authenticate, ctrl.listProducts);

router.get("/:productId", authenticate, isValidId, ctrl.getProductById);

router.post("/", authenticate, validateBody(schemaJoi), ctrl.addProduct);

router.delete("/:productId", authenticate, isValidId, ctrl.removeProduct);

router.put(
  "/:productId",
  authenticate,
  isValidId,
  validateBody(schemaJoi),
  ctrl.updateProduct
);

// router.patch(
//   "/:productId/favorite",
//   authenticate,
//   isValidId,
//   validateBody(updateFavoriteSchemaJoi),
//   ctrl.updateStatusContact
// );

module.exports = router;
