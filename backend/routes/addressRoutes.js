import express from "express"
import  {saveAddess, getAddresses}  from "../controllers/addressController.js "

const router = express.Router();
router.post("/add", saveAddess)
router.get("/:userId", getAddresses)


export default router;