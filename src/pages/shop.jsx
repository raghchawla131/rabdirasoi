import { PRODUCTS } from "../products";
import Product from "../components/Product";

export default function Shop() {
  return (
    <>
      <div id="shop">
        <div className="collections">
          <section className="cakes">
            <h3>Cakes</h3>
            <p>
              Layers of frosting, cake crumbs and see-through-sides make these
              easy-to-spot-cakes darn near impossible to resist.
            </p>
            <div className="product-type cake-cards">
              {PRODUCTS.filter((product) => product.type === "cake").map(
                (product) => (
                  <Product data={product} />
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
