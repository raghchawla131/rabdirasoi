import { Link } from "react-router-dom";
import './Product.css';

export default function Product({ data }) {
  const { name, image_url, description, product_id } = data;

  const productPath = `/products/${product_id}`;

  return (
    <Link
      to={productPath}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="product-card">
        <div className="product-card-division">
          <div className="product-card-top">
            <img src={image_url} alt={name} />
          </div>
          <div className="product-card-bottom">
            <div className="product-card-bottom-content">
              <h5 className="product-card-item-name">{name}</h5>
              <p className="product-card-item-about">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
