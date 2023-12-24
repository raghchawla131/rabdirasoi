import { Link } from "react-router-dom";
export default function HorizontalScrollerItems(item) {
  const { productName, description, key, productImage } = item.data;

  const productPath = `/products/${key}`;

  return (
    <>
      <Link to={productPath} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="scroll-items">
          <div className="scroll-items-top">
            <img key={item.key} src={productImage} alt="productImage" />
          </div>
          <div className="scroll-items-bottom">
            <h4>{productName}</h4>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </>
  )
}