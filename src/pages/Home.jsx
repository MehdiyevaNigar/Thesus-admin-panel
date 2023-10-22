import { useEffect, useState } from "react";
import axios from "axios";
import { formatImgUrl } from "../utils";
import { ProductCard } from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="shopAll">
      <div className="container">
        <h2>All Products</h2>
        <p>{products.length} products</p>
        <div className="shopAll-products">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              price={product.price}
              title={product.title}
              defaultImage={formatImgUrl(product.productImage[0])}
              hoverImage={formatImgUrl(product.productImage[1])}
              sizes={product.sizes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
