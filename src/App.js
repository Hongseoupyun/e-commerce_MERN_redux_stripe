import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import ProductList from "pages/ProductList";
import Product from "pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route exact path="/1" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
