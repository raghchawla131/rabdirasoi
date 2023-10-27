import { useParams } from "react-router-dom";
import { PRODUCTS } from "../products";

export default function ItemDetails() {
  const { productId } = useParams();

  const { productName, price, productImage, about } = PRODUCTS.find(
    (product) => product.key === parseInt(productId)
  );

  return (
    <>
      <div style={{ paddingTop: "81px" }}>
        <div className="selected-item-details">
          <div className="selected-item-img">
            <img src={productImage} alt="" />
          </div>
          <div>
            <h1>{productName}</h1>
            <p>{about}</p>
            <section className="selected-item-price">
              <div>
                <div>
                  <h4>Select size: </h4>
                  <div className="selected-item-size">
                    <div
                      id="1-pound-size"
                      className="selected-item-size-choice"
                    >
                      <div>
                        <h4>1-Pound - 300</h4>
                      </div>
                      <div>
                        <p>Serves group of 2-4</p>
                      </div>
                    </div>
                    <div
                      id="2-pound-size"
                      className="selected-item-size-choice"
                    >
                      <div>
                        <h4>1-Pound - 300</h4>
                      </div>
                      <div>
                        <p>Serves group of 2-4</p>
                      </div>
                    </div>
                    <div
                      id="3-pound-size"
                      className="selected-item-size-choice"
                    >
                      <div>
                        <h4>1-Pound - 300</h4>
                      </div>
                      <div>
                        <p>Serves group of 2-4</p>
                      </div>
                    </div>
                    <div
                      id="4-pound-size"
                      className="selected-item-size-choice"
                    >
                      <div>
                        <h4>1-Pound - 300</h4>
                      </div>
                      <div>
                        <p>Serves group of 2-4</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
