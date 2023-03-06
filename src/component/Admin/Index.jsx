import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Category from "./pages/addCategory/Category";

function IndexAdmin() {
  return (
      <>
        <Topbar />
        <div className="container-admin">
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />}>
                </Route>
                <Route path="/users" element={<UserList />}>
                </Route>
                <Route path="/user/:userId" element={<User />}>
                </Route>
                <Route path="/newUser" element={<NewUser />}>
                </Route>
                <Route path="/products" element={<ProductList />}>
                </Route>
                <Route path="/product/:productId" element={<Product />}>
                </Route>
                <Route path="/newproduct" element={<NewProduct />}>
                </Route>
                <Route path="/category" element={<Category />} />
            </Routes>
        </div>
      </>
  );
}

export default IndexAdmin;
