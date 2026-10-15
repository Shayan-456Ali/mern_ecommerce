import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import api from "../api/axios"

const Navbar = () => {
    const navigate = useNavigate()
    const [cartCount, setCartCount] = useState(0)
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        const loadCart = async()=>{
            if(!userId) return setCartCount(0)
            
            const res = await api.get(`/cart/${userId}`)
            const total = res.data.items.reduce((sum, item) => sum+item.quantity, 0)
            setCartCount(total)

        }
        loadCart()
        window.addEventListener("cartUpdated", loadCart)
        return ()=>{
            window.removeEventListener("cartUpdated", loadCart)
        }
    }, [userId])

    const logout = ()=>{
        localStorage.clear()
        setCartCount(0)
        navigate("/login")
    }
    
  return (
   <nav className="flex justify-between px-15 py-4 shadow">
    <Link to="/" className="font-bold text-xl">Shayan Store</Link>

    <div className="flex gap-4 items-center">
        <Link to={"/cart"} className="relative text-xl">
        {
            cartCount > 0 &&(
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sx px-1 rounded-full">{cartCount}</span>
            )
        }
        </Link>

        {
            !userId ? (
                <>
                <Link to="/login"className="text-lg">login</Link>
                <Link to="/signup"className="text-lg">Signup</Link>
                </>
            ) : (
                <button onClick={logout} className="text-lg">Logout</button>
            )
        }
    </div>

   </nav>
  )
}

export default Navbar
