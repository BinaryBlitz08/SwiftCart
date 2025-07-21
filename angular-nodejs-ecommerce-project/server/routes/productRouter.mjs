import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  decreaseProductStock,
  getProductCountByBrand,
  uploadProductImage,
  getNewProducts,
  getRecommendedProducts,
  getTopDealProducts
} from '../controllers/productController.mjs';
import multer from "multer";
import { protect } from "../controllers/authController.mjs";

const router = express.Router();

const uploadStructure = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

router.get("/new", getNewProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/top-deal", getTopDealProducts);
router.get("/product-counts-by-brand", getProductCountByBrand);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.post("/decrease-stock", decreaseProductStock);

router.patch(
    "/updateImage",
    protect,
    uploadStructure.fields([{ name: "images", maxCount: 5 }]),
    uploadProductImage
);

router.get("/new", getNewProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/top-deal", getTopDealProducts);

export default router;