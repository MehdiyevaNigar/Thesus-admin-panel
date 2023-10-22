import React, { useEffect, useState } from "react";
import { formatImgUrl } from "../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const deleteProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/products/${id}`)
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The product has been deleted.",
              "success"
            ).then(() => {
              navigate("/");
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the product.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="productDetails">
      <div className="container">
        <div className="row">
          <div className="productDetails-left">
            <div className="product-images">
              {product?.productImage &&
                product?.productImage.map((image, index) => (
                  <img
                    className="image"
                    key={index}
                    src={formatImgUrl(image)}
                    alt={`Product ${index}`}
                  />
                ))}
            </div>
          </div>

          <div className="productDetails-right">
            <h1 className="product-title">{product?.title}</h1>
            <p className="product-price">{`m.${product?.price}.00 AZN`}</p>

            <select className="product-size">
              {product?.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <Link to={`/edit/${id}`} className="edit">
              Edit
            </Link>
            <button onClick={() => deleteProduct()} className="btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
