import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import { Cart } from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MenuProvider from "./context/MenuProvider/MenuProvider";
import Search from "./components/Search/Search";
import { useState } from "react";
import LoginPopup from "./components/login/LoginPopup";
import ProductsDetails from "./components/products/ProductsDetails";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import { StoreProvider } from "./context/StoreContext";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/myorders/MyOrders";
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <ToastContainer />

      <MenuProvider>
        <StoreProvider>

          <ScrollToTop />
          {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
          <Navbar setShowLogin={setShowLogin} />
          <div className=" min-h-screen">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/checkout" element={<Checkout />}></Route>
              <Route path="/shop" element={<Shop />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/search/:query" element={<Search />}></Route>
              <Route
                path="/products/:id"
                element={<ProductsDetails />}
              ></Route>
              <Route
                path="/verify"
                element={<Verify />}
              ></Route>

              <Route
                path="/myorders"
                element={
                  <MyOrders />
                }
              ></Route>
            </Routes>
          </div>
          <Footer setShowLogin={setShowLogin} />

        </StoreProvider>

      </MenuProvider>
    </div>
  );
}

export default App;
