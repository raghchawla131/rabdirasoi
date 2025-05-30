import "./Admin.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image_url: "",
    tags: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("${process.env.REACT_APP_BASE_URL}/api/products/get");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Add / Update Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        // Update product
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/products/update/${editId}`,
          form
        );
      } else {
        // Add new product
        await axios.post(
          "${process.env.REACT_APP_BASE_URL}/api/products/add-product",
          form
        );
      }

      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        image_url: "",
        tags: "",
      });
      setEditMode(false);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products/remove/${id}`);
      setProducts(products.filter((p) => p.product_id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      image_url: product.image_url,
      tags: product.tags || "",
    });
    setEditMode(true);
    setEditId(product.product_id);
  };

  return (
    <div className="admin-container">
      <h1>Welcome Admin</h1>

      <section className="add-product-section">
        <h2>{editMode ? "Update Product" : "Add Product"}</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Price:
            <input
              type="number"
              name="price"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category:
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Choose a category</option>
              <option value="Cupcakes">Cupcakes</option>
              <option value="Chocolates">Chocolates</option>
              <option value="Brownies">Brownies</option>
              <option value="Cakes">Cakes</option>
            </select>
          </label>

          <label>
            Image URL:
            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
            />
          </label>

          <label>
            Tags:
            <select name="tags" value={form.tags} onChange={handleChange}>
              <option value="">Choose a tag</option>
              <option value="best seller">Best Seller</option>
              <option value="seasonal">Seasonal</option>
              <option value="new">New</option>
            </select>
          </label>

          <button type="submit" className="btn-add">
            {editMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </section>

      <section className="products-list-section">
        <h2>Products</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6">No products found</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.product_id}>
                  <td>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.tags}</td>
                  <td>
                    <button
                      className="btn-update"
                      onClick={() => handleEdit(product)}
                    >
                      Update
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product.product_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
