import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formatImgUrl } from "../utils";

const Edit = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [imagePreview, setImagePreview] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: 0,
      images: [],
      sizes: [],
    },
  });

  const selectedSizes = watch("sizes", []);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        const { title, price, productImage, sizes } = res.data;
        setValue("title", title);
        setValue("price", price);
        setValue("sizes", sizes);
        setImagePreview(productImage.map(formatImgUrl));
      })
      .catch((err) => console.log(err));
  }, [id, setValue]);

  const handleImages = (event) => {
    setImagePreview([]);

    const uploadedImages = event.target.files;

    let imagesArray = [];
    for (let image of uploadedImages) {
      if (image) {
        imagesArray.push(image);
      }
    }

    setValue("images", imagesArray);
  };
  const images = watch("images");

  useEffect(() => {
    setImagePreview([]);
    for (let image of Array.from(images ?? [])) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        setImagePreview((prev) => [...prev, e.target.result]);
      };
    }
  }, [images]);

  const validateImages = (images) => {
    if (images && images.length > 0) {
      return images.length >= 2 || "At least 2 images are required.";
    }
    return true;
  };

  const handleSizeChange = (event) => {
    const size = event.target.value;
    if (selectedSizes.includes(size)) {
      setValue(
        "sizes",
        selectedSizes.filter((s) => s !== size)
      );
    } else {
      setValue("sizes", [...selectedSizes, size]);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", Number(data.price));
    for (let image of data.images) {
      formData.append("productImage", image);
    }
    data.sizes.forEach((size) => {
      formData.append("sizes", size);
    });

    try {
      await axios.put(`/api/products/${id}`, formData);
      history(`/products/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1>Edit product</h1>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters.",
              },
              maxLength: {
                value: 40,
                message: "Title cannot exceed 40 characters.",
              },
            })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            {...register("price", {
              required: "Price is required.",
              validate: (value) => {
                const parsedValue = parseFloat(value);
                if (isNaN(parsedValue) || parsedValue <= 0) {
                  return "Price must be a positive number.";
                }
                return true;
              },
            })}
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="images">Upload images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImages}
            multiple
            {...register("images", { validate: validateImages })}
          />
          {errors.images && <p className="error">{errors.images.message}</p>}
        </div>
        {imagePreview.length > 0 &&
          imagePreview.map((preview, index) => (
            <img
              key={index}
              width="200px"
              height="200px"
              src={preview}
              alt={`preview-${index}`}
            />
          ))}

        <div className="form-control">
          <label>Sizes</label>
          <div>
            {[36, 37, 38, 39, 40].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  value={String(size)}
                  onChange={handleSizeChange}
                  checked={selectedSizes.includes(String(size))}
                  {...register("sizes", {
                    required: "At least one size is required.",
                  })}
                />
                {size}
              </label>
            ))}
          </div>
          {errors.sizes && <p className="error">{errors.sizes.message}</p>}
        </div>
        <div className="btn-container">
          <button className="btn secondary" type="button">
            <Link to={`/products/${id}`}>Cancel</Link>
          </button>
          <button className="btn primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
