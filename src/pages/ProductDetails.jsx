import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  return (
    <div className="container">
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} style={{ maxWidth: '300px' }} />
          <p>Price: ${product.price}</p>
          <p>{product.description || 'No description available'}</p>
          <button className="btn" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetails;