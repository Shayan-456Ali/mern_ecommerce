import Product from "../models/Product.js"

// create product
export const createProduct = async(req, res)=>{
    try {
        console.log("Received product data:", req.body);
        const product = await Product.create(req.body)
        res.json({ message: "Product created successfully", 
            product,
        })
        
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({message: "Server Erorr", error})
        
    }
}
//get all products
export const getAllProducts = async(req, res)=>{
    try {
        const {search, category} = req.query;
        let filter = {}
        if(search){
            filter.title = {$regex: search, $options: 'i'}
        }
        if(category){
            filter.category = category;  
        }
        const products = await Product.find(filter).sort({createdAt: -1})
        res.json(products)
    } catch (error) {
          res.status(500).json({message: "Server Erorr", error})
    }

}
// Update product

export const updateProduct = async(req, res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json({
            message: "Product Updated successfully",
            updatedProduct,
        })
        
    } catch (error) {
        res.status(500).json({message: "Server Erorr", error})
        
    }

}
export const deleteProduct = async(req, res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.json({message: "Product deleted Successfully!"})
        
    } catch (error) {
        res.status(500).json({message: "Server Erorr", error})
        
    }

}

