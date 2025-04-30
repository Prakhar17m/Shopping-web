import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';

const Details = () => {
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((p) => String(p.id) === String(id));
      setproduct(found);
    }
  }, [id, products]);

  const ProductDeleteHandler = () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (confirm) {
      const updated = products.filter((p) => String(p.id) !== String(id));
      setproducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
      navigate("/");
    }
  };

  if (product === undefined) {
    return <div className="text-center text-red-500 mt-10">Product not found!</div>;
  }

  return product ? (
    <div className='w-[70%] flex h-full justify-between items-center m-auto p-[10%]'>
      <img className='object-contain h-[80%] w-[40%]' src={product.image} alt={product.title} />
      <div className='content w-[50%]'>
        <h1 className='text-4xl'>{product.title}</h1>
        <h3 className='text-zinc-400 my-5'>{product.category}</h3>
        <h2 className='text-red-300 mb-3'>$ {product.price}</h2>
        <p className='mb-[5%]'>{product.description}</p>
        <Link to={`/edit/${product.id}`} className="mr-5 py-2 px-5 border rounded border-blue-200 text-blue-300">Edit</Link>
        <button onClick={()=>ProductDeleteHandler(product.id)} className="py-2 px-5 border rounded border-red-200 text-red-300">Delete</button>
      </div>
    </div>
  ) : <Loading />;
};

export default Details;
