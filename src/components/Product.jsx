export default function Product(props) {
  const { productName, price, productImage, about } = props.data;
  return (
    <>
      <div className="product-card">
        <div className="product-card-division">
          <div className="product-card-top">
            <img src={productImage} alt="" />
          </div>
          <div className="product-card-bottom">
            <p className="product-card-item-name">{productName}</p>
            <p className="product-card-item-about">{price}</p>
          </div>
        </div>
      </div>
    </>
  );
}
