import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../utils/Context';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setproduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const ChangeHandle = (e) => {
    const { name, value } = e.target;
    setproduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (products.length > 0) {
      const existingProduct = products.find((p) => String(p.id) === String(id));
      if (existingProduct) {
        setproduct(existingProduct);
      } else {
        alert("Product not found!");
        navigate("/");
      }
    }
  }, [id, products, navigate]);

  const AddProductHandler = (e) => {
    e.preventDefault();

    const { title, image, category, price, description } = product;

    if (
      title.trim().length < 4 ||
      image.trim().length < 4 ||
      category.trim().length < 4 ||
      price < 1 ||
      description.trim().length < 4
    ) {
      alert("Each input must have at least 4 characters, and price must be greater than 0.");
      return;
    }

    const updatedProducts = products.map((p) =>
      String(p.id) === String(id) ? { ...product, id: p.id } : p
    );

    setproducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/");
  };

  return (
    <form onSubmit={AddProductHandler} className="flex flex-col items-center p-[5%] w-screen h-screen">
      <h1 className="mb-5 w-1/2 text-3xl">Edit Product</h1>

      <input
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={ChangeHandle}
        value={product.image}
      />

      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="title"
        onChange={ChangeHandle}
        value={product.title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="category"
          onChange={ChangeHandle}
          value={product.category}
        />

        <input
          type="number"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="price"
          onChange={ChangeHandle}
          value={product.price}
        />
      </div>

      <textarea
        placeholder="enter product description here ..."
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="description"
        onChange={ChangeHandle}
        value={product.description}
        rows={10}
      ></textarea>

      <div className="w-1/2">
        <button className="py-2 px-5 border rounded border-blue-200 text-blue-300">
          Update Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
