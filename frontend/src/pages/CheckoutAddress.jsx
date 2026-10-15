import { useNavigate } from "react-router"
import api from "../api/axios"
import { useState } from "react"

const CheckoutAddress = () => {

    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()
    const [form, setForm] = useState({
        fullName:"",
        phone:"",
        addressLine:"",
        city:"",
        state:"",
        pincode:""
    })

    const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
  }
  const saveAddress = async()=>{
    await api.post(`/address/add`, {
        ...form,
        userId
    })
    navigate("/checkout")

  }
  return (
    <div className="max-w-xl max-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>
        <div className="flex items-center justify-center">
            <div>   
        {
            Object.keys(form).map((key)=>(
                <input key={key}
                name={key}
                placeholder={key}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2" />
               
            ))
        }
        </div>  
         </div>

        <button onClick={saveAddress}
        className="w-full bg-blue-500 text-white p-2 rounded mt-3">
            Save Address
        </button>
      
    </div>
  )
}

export default CheckoutAddress
