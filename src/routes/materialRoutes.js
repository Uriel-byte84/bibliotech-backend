const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");
const {
  verifyToken,
  isProfessorOrAdmin,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.get("/", materialController.getMaterials);

router.post(
  "/upload",
  verifyToken,
  isProfessorOrAdmin,
  upload.single("file"),
  materialController.uploadMaterial,
);

module.exports = router;
