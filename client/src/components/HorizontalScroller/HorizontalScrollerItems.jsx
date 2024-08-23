import { Link } from "react-router-dom";

export default function HorizontalScrollerItems({ data }) {
  const { name, description, product_id, image_url } = data;
  const productPath = `/products/${product_id}`;

  return (
    <>
      <Link
        to={productPath}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="scroll-items">
          <div className="scroll-items-top">
            <img key={product_id} src={image_url} alt="productImage" />
          </div>
          <div className="scroll-items-bottom">
            <h4>{name}</h4>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
