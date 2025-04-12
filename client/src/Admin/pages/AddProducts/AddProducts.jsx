import React, { useState } from 'react';
import axios from 'axios';
import './AddProducts.css';

const AddProducts = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Cakes');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      category,
      price: parseInt(price, 10),
      image_url: imageUrl,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/products/add-product`, product);

      if (response.status === 201) {
        alert('Product added successfully');
        // Reset form fields
        setName('');
        setDescription('');
        setCategory('Cakes'); 
        setPrice('');
        setImageUrl('');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className='add-products-container'>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className='add-product-form'>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='category'>Category:</label>
          <select
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value='Cakes'>Cakes</option>
            <option value='Chocolates'>Chocolates</option>
            <option value='Cupcakes'>Cupcakes</option>
            <option value='Brownie'>Brownie</option>
          </select>
        </div>
        <div>
          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='imageUrl'>Image URL:</label>
          <input
            type='text'
            id='imageUrl'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
