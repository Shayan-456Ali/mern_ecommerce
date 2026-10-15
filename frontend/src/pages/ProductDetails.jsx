import { useState } from "react"
import { useParams } from "react-router"
import api from "../api/axios"
import { useEffect } from "react"

const ProductDetails = () => {

  const {id} = useParams()
  const [product, setProduct] = useState(null)

  
  useEffect(() => {
    const loadProduct = async()=>{
      const res = await api.get("/product")
      const p = res.data.find((item)=> item._id === id)
      setProduct(p)
  
    }
    loadProduct()
  }, [])

  if(!product){
    return <div>loading...</div>
  }
  
  
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain bg-white rounded " />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-bold mt-4">${product.price}</p>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
        Add to Cart
      </button>

    </div>
  )
}

export default ProductDetails
