import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import NewProduct from "./pages/newProduct/NewProduct";
import Category from "./pages/addCategory/Category";
import BookList from "./pages/book-list/Book";

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
                <Route path="/newproduct" element={<NewProduct />}>
                </Route>
                <Route path="/category" element={<Category />} />
                <Route path={"/book/show"} element={<BookList />} />
            </Routes>
        </div>
      </>
  );
}

export default IndexAdmin;
