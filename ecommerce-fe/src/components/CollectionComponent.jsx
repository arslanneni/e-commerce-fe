import React, { useState, useEffect } from 'react';

const CollectionComponent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');


  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products/getAllActiveProducts'); 
      const data = await response.json();
      if (data.status==='SUCCESS') {
        setProducts(data.data); 
        setFilteredProducts(data.data);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category.name === category));
    }
  };

  // Sort products
  const sortProducts = (option) => {
    setSortOption(option);
    let sortedProducts = [...filteredProducts];
    if (option === 'Price: Low to High') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'Price: High to Low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main layout */}
      {JSON.stringify(products[0].category.name)}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Filters Section */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Filters</h3>
          <ul className="space-y-3">
            <li>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  selectedCategory === 'All' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => filterProducts('All')}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  selectedCategory === 'Men' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => filterProducts('Men')}
              >
                Men
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  selectedCategory === 'Women' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => filterProducts('Women')}
              >
                Women
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  selectedCategory === 'Kids' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => filterProducts('Kids')}
              >
                Kids
              </button>
            </li>
          </ul>
        </div>

        {/* Center Products Section */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Collections</h2>
            <select
              value={sortOption}
              onChange={(e) => sortProducts(e.target.value)}
              className="bg-gray-100 p-2 rounded-lg border border-gray-300"
            >
              <option value="">Sort By</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="border border-gray-300 shadow-lg rounded-lg p-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionComponent;
