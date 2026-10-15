import {createBrowserRouter, Outlet, RouterProvider} from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ProductDetails from "./pages/ProductDetails"
import ProductList from "./admin/ProductList"
import AddProduct from "./admin/addProduct"
import EditProduct from "./admin/EditProduct"
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart"
import Checkout from "./pages/checkout"
import CheckoutAddress from "./pages/CheckoutAddress"
import OrderSuccess from "./pages/OrderSuccess"
// import { Children } from "react"


function Layout(){
    return (
      <>
      <Navbar />
      <Outlet />
      </>
    )
  }
const router = createBrowserRouter([
  {
    element : <Layout />,
    children: [
      {path:"/", element:<Home/>},
      {path:"/Login", element:<Login/>},
      {path:"/SignUp", element:<SignUp/>},
      {path:"/ProductDetails/:id", element:<ProductDetails/>},

      {path:"/admin/product", element:<ProductList/>},
      {path:"/admin/product/add", element:<AddProduct/>},
      {path:"/admin/product/update/:id", element:<EditProduct/>},

      {path:"/cart", element:<Cart/>},
      {path:"/checkout-address", element:<CheckoutAddress/>},
      {path:"/checkout", element:<Checkout/>},
      {path:"/order-success/:id", element:<OrderSuccess/>},
      

    ]
  }
 
  
])


export default function App(){
  return <RouterProvider router={router}/>

}