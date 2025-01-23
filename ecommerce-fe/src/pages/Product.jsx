import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const Product = () => {
  const { productid } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartResponse, setCartResponse] = useState(null);


  const getUserIdFromCookie = () => {
    const userId = Cookies.get('ID'); 
    return userId ? userId : null; 
  };

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/getProductDetailsByID/${productid}`);
      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setProduct(data.data);
      } else {
        setError(data.message || 'Failed to fetch product details');
      }
    } catch (err) {
      setError('An error occurred while fetching product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productid]);

  const handleAddToCart = async () => {
    if (!product) return;

    const userId = getUserIdFromCookie();
    const body = {
      user_id: userId,
      product_id: product[0].id,
      quantity,
    };

    try {
      const response = await fetch('http://localhost:5000/cart/addtoCart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setCartResponse({ success: true, message: data.message });
      } else {
        setCartResponse({ success: false, message: data.message });
      }
    } catch (err) {
      setCartResponse({ success: false, message: 'An error occurred while adding to the cart' });
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) return <p className="text-center text-gray-600">Loading product details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={product[0].image_url}
            alt={product[0].name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product[0].name}</h1>
            <p className="text-gray-600 text-sm mb-6">{product[0].description}</p>
            <p className="text-2xl font-semibold text-gray-900 mb-6">${product[0].price.toFixed(2)}</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 py-2 text-gray-800">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                +
              </button>
            </div> */}
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900"
            >
              Add to Cart
            </button>
          </div>

          {cartResponse && (
            <p
              className={`mt-4 ${
                cartResponse.success ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {cartResponse.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
