import { Link } from "react-router-dom";
import './Product.css';

export default function Product({ data }) {
  const { name, image_url, description, product_id } = data;

  const productPath = `/products/${product_id}`;

  const truncatedName = name.length > 18 ? `${name.slice(0, 18)}...` : name;
  const truncatedDesc = description.length > 33 ? `${description.slice(0, 33)}...` : description;

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
              <h5 className="product-card-item-name">{truncatedName}</h5>
              <p className="product-card-item-about">{truncatedDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
