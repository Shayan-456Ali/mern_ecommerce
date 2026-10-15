import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router"
import api from "../api/axios";

const EditProduct = () => {
    
    const {id} = useParams()
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category:"",
        image: "",
        stock: ""
    });
    const navigate = useNavigate();
    const allowedFeilds = ["title", "description", "price", "category", "image", "stock"]
    
    useEffect(()=>{
        const loadProduct = async ()=>{
            const res = await api.get("/product")
            const product = res.data.find((p)=> p._id === id)
            setForm(product)
            
        }
        loadProduct()
    }, [id])
    
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await api.put(`/product/update/${id}`, form)
            alert("Product updated successfully")
            navigate("/admin/product")
            
        } catch (error) {
            console.error("Error updating product", error)
            
        }
    }
  return (
     <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-6">Add new Product</h2>
        <form onSubmit={handleSubmit} method="post" className="space-y-3">
            {
            allowedFeilds.map((key)=>(
                allowedFeilds.includes(key) &&
                <input
                key={key}
                name={key}
                value={form[key]}
                placeholder={key}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"  />
            ))
            }
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Product</button>
        </form>
      
    </div>
  )
}

export default EditProduct
