const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/productsContr");
const { validateBody, isValidId, authenticate } = require("../../middlewars");
const { schemaJoi, updateFavoriteSchemaJoi } = require("../../models/product");

router.get("/", ctrl.listProducts); //authenticate,

router.get("/:productId", isValidId, ctrl.getProductById); //authenticate,

router.post("/", validateBody(schemaJoi), ctrl.addProduct); //authenticate,

router.delete("/:productId", isValidId, ctrl.removeProduct); //authenticate,

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
