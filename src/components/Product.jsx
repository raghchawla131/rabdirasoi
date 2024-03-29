import { Link } from "react-router-dom";

export default function Product(item) {
  const { productName, productImage, about, key } = item.data;

  const productPath = `/products/${key}`;

  return (
    <>
    <Link to={productPath} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <div className="product-card-division">
          <div className="product-card-top">
            <img src={productImage} alt="" />
          </div>
          <div className="product-card-bottom">
            <div className="product-card-bottom-content">
              <h5 className="product-card-item-name">{productName}</h5>
              <p className="product-card-item-about">{about}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
}
