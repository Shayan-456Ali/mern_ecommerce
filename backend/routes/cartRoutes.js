import express from "express"
import {
    addtoCart,
    removeItem,
    updateQuantity,
    getCart

} from "../controllers/cartController.js"

const router = express.Router()
// Add item to cart
router.post("/add", addtoCart)

// remove item from cart
router.post("/remove", removeItem)

// update items quantity in cart
router.post("/update", updateQuantity)

// Get user's cart
router.get("/:userId", getCart)

export default router;