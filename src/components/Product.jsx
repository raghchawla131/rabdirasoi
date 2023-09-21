export default function Product(props) {
  const { productName, price, productImage, about, } = props.data;
  return (
    <>
      <div className="product-card">
        <img src={productImage} alt="" />
        <div className="product-card-info">
          <p className="product-card-item-name">{productName}</p>
          <p className="product-card-item-about">{about}</p>
        </div>
      </div>
    </>
  );
}
