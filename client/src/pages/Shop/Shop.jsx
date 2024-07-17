import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import Product from "../../components/Product";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:8001/api/products/show-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  return (
    <div id="shop">
      <div className="collections">
        <section className="cakes product">
          <div className="header">
            <h3>Cakes</h3>
            <p>
              Layers of frosting, cake crumbs and see-through-sides make these
              easy-to-spot-cakes darn near impossible to resist.
            </p>
          </div>
          <div className="product-type">
            {filterProductsByCategory("Cakes").map((product) => (
              <Product key={product.product_id} data={product} />
            ))}
          </div>
        </section>
        <section className="brownies product">
          <div className="header">
            <h3>Brownies</h3>
            <p>
              Layers of frosting, cake crumbs and see-through-sides make these
              easy-to-spot-cakes darn near impossible to resist.
            </p>
          </div>
          <div className="product-type">
            {filterProductsByCategory("Brownies").map((product) => (
              <Product key={product.product_id} data={product} />
            ))}
          </div>
        </section>
        <section className="chocolates product">
          <div className="header">
            <h3>Chocolates</h3>
            <p>
              Layers of frosting, cake crumbs and see-through-sides make these
              easy-to-spot-cakes darn near impossible to resist.
            </p>
          </div>
          <div className="product-type">
            {filterProductsByCategory("Chocolates").map((product) => (
              <Product key={product.product_id} data={product} />
            ))}
          </div>
        </section>
        <section className="cupcakes product">
          <div className="header">
            <h3>Cupcakes</h3>
            <p>
              Layers of frosting, cake crumbs and see-through-sides make these
              easy-to-spot-cakes darn near impossible to resist.
            </p>
          </div>
          <div className="product-type">
            {filterProductsByCategory("Cupcakes").map((product) => (
              <Product key={product.product_id} data={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
