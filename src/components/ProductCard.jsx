import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </Link>
      <button className="btn" onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;