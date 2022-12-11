import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home/Home";
import NavBar from "./Pages/Shared/NavBar";
import Login from "./Pages/Verification/Login";
import SignUp from "./Pages/Verification/SignUp";
import Purchase from "./Pages/Purchase";
import RequireAuth from "./Pages/Authentication/RequireAuth";
import ResetPass from "./Pages/ResetPass";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyOrder from "./Pages/Dashboard/MyOrder";
import AddReview from "./Pages/Dashboard/AddReview";
import MyProfile from "./Pages/Dashboard/MyProfile/MyProfile";
import AllOrder from "./Pages/Dashboard/AllOrder";
import AddProduct from "./Pages/Dashboard/AddProduct";
import ManageProduct from "./Pages/Dashboard/ManageProduct";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import Payment from "./Pages/Verification/Payment";
import NotFound from "./Pages/NotFound/NotFound";
import Blogs from "./Pages/Blogs";
import MyPortfolio from "./Pages/MyPortfolio";
import RequireAdmin from "./Pages/Authentication/RequireAdmin";

function App() {
  return (
    <div className="App overflow-hidden" data-theme="aqua">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }
        ></Route>
        <Route path="/pay/:id" element={<Payment></Payment>}></Route>
        <Route path="/reset" element={<ResetPass></ResetPass>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path="myorder" element={<MyOrder></MyOrder>}></Route>
          <Route path="addreview" element={<AddReview></AddReview>}></Route>
          <Route
            path="allorders"
            element={
              <RequireAdmin>
                <AllOrder></AllOrder>
              </RequireAdmin>
            }
          />
          <Route
            path="addproduct"
            element={
              <RequireAdmin>
                <AddProduct></AddProduct>
              </RequireAdmin>
            }
          />
          <Route
            path="makeadmin"
            element={
              <RequireAdmin>
                <MakeAdmin></MakeAdmin>
              </RequireAdmin>
            }
          />
          <Route
            path="manageproduct"
            element={
              <RequireAdmin>
                <ManageProduct></ManageProduct>
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="/portfolio" element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}

export default App;
