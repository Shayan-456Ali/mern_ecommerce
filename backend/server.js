import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import ConnectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import addressRoutes from "./routes/addressRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config();

const port  = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/address", addressRoutes)
app.use("/api/order", orderRoutes)


app.get('/', (req,res)=>{
    res.send("Shayan")
})

ConnectDB();


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    
})