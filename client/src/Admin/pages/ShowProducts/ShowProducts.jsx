import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowProducts.css';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:8001/api/products/show-products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:8001/api/products/delete-product/${productId}`);
      if (response.status === 200) {
        // Remove the deleted product from the state
        setProducts(products.filter(product => product.product_id !== productId));
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };

  return (
    <div className='show-products-container'>
      <h1>Products List</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.product_id}>
                <td>
                  <img src={product.image_url} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>&#8377;{product.price}</td>
                <td>
                  <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowProducts;
