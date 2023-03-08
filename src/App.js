import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import ProductList from "pages/ProductList";
import Product from "pages/Product";
import Signin from "pages/Signin";
import Signup from "pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route exact path="/1" element={<Product />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
