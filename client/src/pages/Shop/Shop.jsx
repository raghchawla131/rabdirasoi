import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import Product from "../../components/ShopProduct/Product";
import { useLoading } from "../../context/loadingContext";

const ITEMS_PER_LOAD = 5;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const { loading, setLoading } = useLoading();
  // Track how many items to show per category
  const [itemsToShow, setItemsToShow] = useState({
    Cakes: ITEMS_PER_LOAD,
    Brownies: ITEMS_PER_LOAD,
    Chocolates: ITEMS_PER_LOAD,
    Cupcakes: ITEMS_PER_LOAD,
  });

  // Track whether "show less" is active (true means showing all items)
  const [showAll, setShowAll] = useState({
    Cakes: false,
    Brownies: false,
    Chocolates: false,
    Cupcakes: false,
  });

useEffect(() => {
  window.scrollTo(0, 0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/get`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [setLoading]);


  const filterProductsByCategory = (category) =>
    products.filter((product) => product.category === category);

  const toggleShowMore = (category) => {
    if (showAll[category]) {
      // Show less - reset to ITEMS_PER_LOAD
      setItemsToShow((prev) => ({
        ...prev,
        [category]: ITEMS_PER_LOAD,
      }));
      setShowAll((prev) => ({
        ...prev,
        [category]: false,
      }));
    } else {
      // Show all
      const totalItems = filterProductsByCategory(category).length;
      setItemsToShow((prev) => ({
        ...prev,
        [category]: totalItems,
      }));
      setShowAll((prev) => ({
        ...prev,
        [category]: true,
      }));
    }
  };

  const renderCategorySection = (category, description) => {
    const filtered = filterProductsByCategory(category);
    const itemsShown = filtered.slice(0, itemsToShow[category]);

    return (
      <section className={`${category.toLowerCase()} product`}>
        <div className="header">
          <h3>{category}</h3>
          <p>{description}</p>
        </div>
        <div className="product-type">
          {itemsShown.map((product) => (
            <Product key={product.product_id} data={product} />
          ))}

          {/* Show button only if total items are more than ITEMS_PER_LOAD */}
          {filtered.length > ITEMS_PER_LOAD && (
            <button
              onClick={() => toggleShowMore(category)}
              className="load-more-btn"
              aria-expanded={showAll[category]}
              aria-controls={`${category}-products`}
            >
              {showAll[category] ? (
                <>
                  Show less
                </>
              ) : (
                <>
                  Show more 
                </>
              )}
            </button>
          )}
        </div>
      </section>
    );
  };

  if(loading) return null;

  return (
    <div id="shop">
      <div className="collections">
        {renderCategorySection(
          "Cakes",
          "Layers of frosting, cake crumbs and see-through-sides make these easy-to-spot-cakes darn near impossible to resist."
        )}
        {renderCategorySection(
          "Brownies",
          "Layers of frosting, cake crumbs and see-through-sides make these easy-to-spot-cakes darn near impossible to resist."
        )}
        {renderCategorySection(
          "Chocolates",
          "Layers of frosting, cake crumbs and see-through-sides make these easy-to-spot-cakes darn near impossible to resist."
        )}
        {renderCategorySection(
          "Cupcakes",
          "Layers of frosting, cake crumbs and see-through-sides make these easy-to-spot-cakes darn near impossible to resist."
        )}
      </div>
    </div>
  );
}
