import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <h1>Welcome Admin</h1>

      <section className="add-product-section">
        <h2>Add Product</h2>
        <form className="product-form">
          <label>
            Product ID:
            <input type="text" name="product_id" placeholder="Enter product ID" required />
          </label>

          <label>
            Name:
            <input type="text" name="name" placeholder="Enter product name" required />
          </label>

          <label>
            Description:
            <textarea name="description" placeholder="Enter description" />
          </label>

          <label>
            Price:
            <input type="number" name="price" step="0.01" placeholder="Enter price" required />
          </label>

          <label>
            Category:
            <input type="text" name="category" placeholder="Enter category" />
          </label>

          <label>
            Image URL:
            <input type="text" name="image_url" placeholder="Enter image URL" />
          </label>

          <label>
            Tags:
            <select name="tags" defaultValue="">
              <option value="" disabled>Choose a tag</option>
              <option value="best seller">Best Seller</option>
              <option value="seasonal">Seasonal</option>
              <option value="new">New</option>
            </select>
          </label>

          <button type="submit" className="btn-add">Add Product</button>
        </form>
      </section>

      <section className="products-list-section">
        <h2>Products</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example placeholder rows */}
            <tr>
              <td>p001</td>
              <td>Chocolate Cake</td>
              <td>Cakes</td>
              <td>499.00</td>
              <td>Best Seller</td>
              <td>
                <button className="btn-update">Update</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>p002</td>
              <td>Strawberry Muffin</td>
              <td>Muffins</td>
              <td>149.00</td>
              <td>New</td>
              <td>
                <button className="btn-update">Update</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Admin;
