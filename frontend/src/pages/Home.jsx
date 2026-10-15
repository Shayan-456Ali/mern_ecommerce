import { useState } from "react"
import api from "../api/axios"
import { useEffect } from "react"
import { Link } from "react-router"

const Home = () => {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  useEffect(()=>{
    const loadProducts = async()=>{
      const res = await api.get(`/product?search=${search}&category=${category}`)
      setProducts(res.data)
    }
    loadProducts()
  }, [search, category])


  const addtoCart = async(productId)=>{
    const userId  = localStorage.getItem("userId")
    if(!userId){
      alert("Please login before add items to your cart")
      return;
    }
    const res = await api.post(`/cart/add`, {userId, productId})
    const total = res.data.cart.items.reduce((sum, item) => sum + item.productId._id * item.quantity, 0);
    localStorage.setItem("cartCount", total)
    window.dispatchEvent(new Event("cartUpdated"))
  }
  return (
    <div className="p-6">
      <div className="mb-4 flex gap-3">
        <input placeholder="Search products"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        className="border px-3 py-4 rounded w-1/2" 
        />
        {/* category filter */}
        <select
        value={category}
        onChange={(e)=> setCategory(e.target.value)}
        className="border px-3 py-4 rounded">
          <option value="">All Categories</option>
          <option value="Television">Television</option>
          <option value="phone">Phone</option>
          <option value="Laptop">Laptop</option>
          <option value="Tablet">Tablet</option>
        </select>
      </div>
      {/* product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {
          products.map((product)=>(
           
            <div key={product._id} className="border p-3 rounded shadow hover:shadow-lg transition hover:scale-101 ">
            <Link
              to={`/ProductDetails/${product._id}`}
              className="">

              <img className="w-full h-50 object-contain bg-white rounded" src={product.image} alt={product.title} />
              <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            </Link>
            <button onClick={() => addtoCart(product._id)}
              className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 ">Add to Cart
            </button>
            </div>
           
          ))
        }

      </div>



      
    </div>
  )
}

export default Home
