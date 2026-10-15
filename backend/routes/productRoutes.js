import express from "express"
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct

} from "../controllers/productController.js"

const router = express.Router()
router.post("/add", createProduct)

router.get("/", getAllProducts)

router.put("/update/:id", updateProduct)

router.delete("/delete/:id", deleteProduct)

export default router;