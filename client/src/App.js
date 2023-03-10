import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import ProductList from "pages/ProductList";
import Product from "pages/Product";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Cart from "pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route exact path="/1" element={<Product />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
