import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div>
        <h3>{item.name}</h3>
        <p>Price: ${item.price} x {item.quantity}</p>
        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button className="btn-danger" onClick={() => dispatch(removeFromCart(item.id))}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;