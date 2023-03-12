import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import index from "./api";
import Cart from "./component/Cart/Cart";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Search from "./component/Search/Search";
import Signup from "./component/Signup/Signup";
// import KeepAlive, { AliveScope } from "react-activation";
import DetailBook from "./component/DetailBook/DetailBook";
import Admin from "./component/Admin/Admin";
import History from "./component/History/History";
import Staff from "./component/Staff/Staff";
import Chat from "./component/Chat/Chat";
import Socket from "./component/Socket/Socket";

export const AppContext = createContext();
const App = () => {
  const [auth, setAuth] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [isSeaching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await index();
      if (result.auth === true) {
        setAuth(result.auth);
        setUser(result);
      } else {
        setAuth(result.auth);
      }
    })();
  }, []);
  return (
    <AppContext.Provider
      value={{
        auth,
        user,
        searchResult,
        setSearchResult,
        setIsSearching,
        isSeaching,
      }}
    >
      {/* <AliveScope> */}
        <Socket>
          <Router>
            <Routes>
              <Route
                path={"/"}
                element={
                  // <KeepAlive>
                    <Home />
                  // </KeepAlive>
                }
              />
              <Route path={"/signup"} element={<Signup />} />
              {auth === true ? (
                <Route
                  path={"/login"}
                  element={<Navigate to={"/"} replace={true} />}
                />
              ) : (
                <Route path={"/login"} element={<Login />} />
              )}
              <Route path={"/login"} element={<Login />} />
              <Route path={"/cart"} element={<Cart />} />
              <Route path={"/search"} element={<Search />} />
              <Route path="/history" element={<History />} />
              <Route
                path={"/book/:book_id"}
                element={
                  // <KeepAlive when={true} id={"12345"}>
                    <DetailBook />
                  // </KeepAlive>
                }
              />
              <Route path={"/admin/*"} element={<Admin />} />
              <Route path={"/staff/*"} element={<Staff />} />
            </Routes>
            {
              auth=== true && parseInt(user?.role)=== 1 &&  
              <Chat />
            }
          </Router>
        </Socket>
      {/* </AliveScope> */}
    </AppContext.Provider>
  );
};

export default App;
