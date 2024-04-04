import { PRODUCTS } from "../products";
import Product from "../components/Product";
import { useEffect } from "react";

export default function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <>
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
              {PRODUCTS.filter((product) => product.type === "cake").map(
                (product) => (
                  <Product key={product.key} data={product} />
                )
              )}
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
              {PRODUCTS.filter((product) => product.type === "brownie").map(
                (product) => (
                  <Product key={product.key} data={product} />
                )
              )}
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
              {PRODUCTS.filter((product) => product.type === "chocolate").map(
                (product) => (
                  <Product key={product.key} data={product} />
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
