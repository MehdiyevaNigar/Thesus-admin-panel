import { Link } from "react-router-dom";
import { useState } from "react";
export const ProductCard = ({
  id,
  title,
  price,
  defaultImage,
  hoverImage,
  sizes,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="productCard">
      <Link to={`/products/${id}`}>
        <div className="img-container">
          <img
            className="product-image"
            src={isHovered ? hoverImage : defaultImage}
            alt={title}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      </Link>
      <div>
        <h3 className="title">{title}</h3>
        <h4 className="price">{`m.${price}.00 AZN`}</h4>
      </div>
      <select className="product-size">
        {sizes?.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};
