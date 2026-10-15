import Cart from "../models/Cart.js"
import Order from "../models/Order.js";
import Product from "../models/Product.js";



export const placeOrder = async(req, res)=>{

    try {
        const {userId, address} = req.body

        // get cart items
        const cart = await Cart.findOne({userId}).populate('items.productId');
        if(!cart || cart.items.length === 0){
            return res.status(400).json({message: "Cart is empty"})
        }

        //prepare order items
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
        }))

        // calculate total ammount
        const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0)

        // deduct stock from products
        for(let item of cart.items){
            await Product.findByIdAndUpdate(item.productId._id, {$inc: {stock: -item.quantity} });
        }

        //create order

        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD",
        });

        //clear cart
        await Cart.findOneAndUpdate({userId}, {items: []})
        res.status(201).json({message: "Order placed successfully", order})
        
    } catch (error) {
        console.error("Place order error:", error);

    return res.status(500).json({
        message: error.message
    });
        
    }

}