import React, { useEffect, useState } from 'react';

const LatestCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchLatestCollections = async () => {
    try {
      const response = await fetch('http://localhost:5000/products/getLatestProducts');
      const data = await response.json();
        console.log(data,'data')
      if (data.status==='SUCCESS') {
        setCollections(data.data); 
      } else {
        setError(data.message || 'Failed to fetch collections');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestCollections();
  }, []);

  return (
    <>
 
    <div className="container mx-auto px-4 py-8">
     
      <h2 className="prata-regular text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
        Latest Collections
      </h2>

    
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
        Explore our latest collection of stylish and trendy designs, crafted with the finest materials to meet your taste. Whether you're looking for casual wear, formal attire, or something in between, our collection offers something special for every occasion.
      </p>

     
      {loading && <p className="text-center text-gray-600">Loading collections...</p>}

    
      {error && <p className="text-center text-red-500">{error}</p>}

    
      {collections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="border border-gray-300 shadow-lg rounded-lg p-6">
              <img
                src={collection.image_url} 
                alt={collection.name}
                className="w-full h-56 object-cover rounded-md mb-4"  // Adjusted size
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{collection.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{collection.description}</p>
              <p className="text-gray-900 font-semibold text-lg">${collection.price.toFixed(2)}</p>  
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-600">No collections found.</p>
      )}
    </div>
    </>
  );
};

export default LatestCollections;
