import { useState } from "react"
import api from "../api/axios"

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""

  })
  const [msg, setMsg] = useState("")

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response  = await api.post("/auth/signUp", form)
      setMsg(response.data.message)
    } catch (error) {
      setMsg(error.response?.data?.message || "An error occurred")
    }
  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {msg && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} method="post" className="space-y-4">
          <input 
          name="name"
          placeholder="Enter Name" 
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required/>

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
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">SignUp</button>
        </form>

      </div>
      
    </div>
  )
}

export default SignUp
