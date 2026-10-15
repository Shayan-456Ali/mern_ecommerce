
import { useState } from 'react'
import api from '../api/axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Checkout = () => {
    const userId = localStorage.getItem("userId")
    const [address, setAddress] = useState([])
    const [cart, setCart] = useState(null)
    const [selectAddress, setSelectAddress] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if(!userId){
            navigate("/")
            return;
        }
        api.get(`/cart/${userId}`).then((res)=> setCart(res.data));
        api.get(`/address/${userId}`)
    .then((res) => {
        console.log("Full address response:", res.data);

        const addresses = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data.addresses)
                ? res.data.addresses
                : [];

        setAddress(addresses);
        setSelectAddress(addresses.length > 0 ? addresses[0] : null);
    })
    .catch((error) => {
        console.error("Address API error:", error.response?.data || error.message);
    });
    }, [])

    if(!cart){
        return <div>
            ...loading
        </div>
    }
    const total = cart.items.reduce((sum, i)=> sum+i.quantity * i.productId.price, 0)

    const placeOrder = async () => {
        if (!selectAddress) {
        alert("Please select an address");
        return;
        }

    try {
    const res = await api.post("/order/place", {
        userId,
        address: selectAddress
    });

    alert("Order placed successfully!");
    console.log("Order placed:", res.data);
    navigate(`/order-success/${res.data.order._id}`);
    } catch (error) {
    console.error(
        "Order placement failed:",
        error.response?.data || error.message
    );

    alert(
        error.response?.data?.message ||
        "Failed to place order. Please try again."
    );
}

};
    
  return (
    <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
        <h2 className='font-semibold mb-2'>Select Address</h2>
        {
            address.map((addr)=>(
                <label key={addr._id}
                className='block border p-3 rounded cursor-pointer mb-2'>
                    <input
                    type='radio'
                    name='address'
                    checked={selectAddress?._id === addr._id}
                    onChange={()=> setSelectAddress(addr)}
                    className='mr-2' />
                    <strong>{addr.fullName}</strong>
                    <p className='text-sm'>
                        {addr.addressline}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className='text-sm'>{addr.phone}</p>
                  

                </label>
            ))
        }
        <h2 className='font-semibold mb-2'>Order summary</h2>
        <p className='text-lg font-bold'>Total Ammout : ${total}</p>

        <button onClick={placeOrder} className='mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'>
            Place Order (COD)
        </button>
      
    </div>
  )
}

export default Checkout
