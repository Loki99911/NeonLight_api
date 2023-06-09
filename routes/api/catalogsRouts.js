const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/catalogContr");
const { validateBody, isValidId } = require("../../middlewars");
const { catalogSchemaJoi } = require("../../models/user");

router.get("/", isValidId, ctrl.listCatalogs);
router.post("/", validateBody(catalogSchemaJoi), ctrl.addCatalog);
router.delete("/:catalogId", isValidId, ctrl.removeCatalog);
router.put(
  "/:catalogId",
  isValidId,
  validateBody(catalogSchemaJoi),
  ctrl.updateCatalog
);
module.exports = router;
