import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { clearCart } from '../redux/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="cart-total">
            <p>Total: ${total.toFixed(2)}</p>
            <button className="btn" onClick={() => dispatch(clearCart())}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;