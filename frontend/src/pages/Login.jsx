import { useNavigate } from "react-router";
import api from "../api/axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("")

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", form)
      console.log(response.data);

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userId", response.data.user.id)
      setMsg("Login Successfull")

     setTimeout(()=>{
      navigate("/")

     }, 1000)
      
    } catch (error) {
      setMsg(error.response?.data?.message || "An error occured")
      
    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
         <h2 className="text-2xl font-bold mb-6 text-center">Login to your Account</h2>
     
       {msg && (
          <div className="mb-4 text-center text-sm text-red-600 font-medium">
            {msg}
          </div>
        )}

         <form onSubmit={handleSubmit} method="post" className="space-y-4">
          <input 
          type="email"
          name="email"
          placeholder="Enter email" 
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required/>

          <input 
          type="password"
          name="password"
          placeholder="Enter password" 
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required/>

          <button type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Login</button>
        </form>

       </div>
    </div>
  )
}

export default Login
