import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import { Cart } from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { ProductsProvider } from "./context/ProductsProvider/ProductsProvider";
import MenuProvider from "./context/MenuProvider/MenuProvider";
import Search from "./components/Search/Search";
import { useState } from "react";
import LoginPopup from "./components/login/LoginPopup";
import ProductsDetails from "./components/products/ProductsDetails";
import CartProvider from "./context/CartProvider/CartProvider";
function App() {

  const [showLogin, setShowLogin] = useState(false);



  return (

    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    <MenuProvider>
      <ProductsProvider>
        <CartProvider>
          <Navbar setShowLogin={setShowLogin} />
            <div className="  min-h-screen">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/about" element={<About />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
            <Route path="/search" element={<Search />} ></Route>
              <Route path="/products/:id" element={<ProductsDetails />} ></Route> 
          </Routes>
        </div>
          <Footer />
        </CartProvider>
      </ProductsProvider>
    </MenuProvider>
    </>

  )
}

export default App
