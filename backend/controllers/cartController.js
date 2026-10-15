import Cart from "../models/Cart.js"



export const addtoCart = async (req, res)=>{
    try {
        const {userId, productId} = req.body;
        let cart = await Cart.findOne({ userId })
    
        if(!cart){
            cart  = new Cart({ userId, items: [
                {productId, quantity: 1}
            ]})
    
        }else{
            const item = cart.items.find( i => i.productId.toString() === productId);
            if(item){
                item.quantity +=1;
            }
            else{
                cart.items.push({productId, quantity: 1})
            }
        }

        await cart.save()
        res.json({
            message: "items added to cart",
            cart
        })
        
    } catch (error) {
        res.status(500).json({messaage: "Server Error", error})
        
    }
}


export const removeItem = async(req, res)=>{
    try {
        const {userId, productId} = req.body;
            let cart = await Cart.findOne({ userId })
    
            if(!cart){
                return res.status(400).json({message: "Cart not found"})
            }
        
            cart.items = cart.items.filter(
                i => i.productId.toString() !== productId
            );

            await cart.save();
            res.json({
                message: "Item removed from Cart",
                cart
            })
    } catch (error) {
         res.status(500).json({messaage: "Server Error", error})
    }
}

export const updateQuantity = async(req, res)=>{
    try {
        const {userId, productId, quantity} = req.body
        const cart = await Cart.findOne({userId})

        if(!cart){
            return res.status(400).json({message: "Cart not found"})
        }

        const item = cart.items.find( i => i.productId.toString() === productId);

        if(!item){
            return res.status(400).json({message: "Item not found in cart"})
        }
        item.quantity = quantity;

        await cart.save()
        res.json({
            message: "Item quantity Updated",
            cart
        })
    } catch (error) {
        res.status(500).json({messaage: "Server Error", error})
    }

}

export const getCart = async(req, res)=>{
    try {
        const {userId} = req.params;
        const cart = await Cart.findOne({userId}).populate("items.productId")
        res.json(cart)
    } catch (error) {
        res.status(500).json({messaage: "Server Error", error})
    }
    


}