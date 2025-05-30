import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../redux/slices/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getProfile());
    }
  }, [dispatch, user, navigate]);

  return (
    <div className="container">
      <h2>Profile</h2>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : user ? (
        <div>
          <p>Email: {user.email}</p>
          {/* Add more profile fields as returned by API */}
        </div>
      ) : null}
    </div>
  );
}

export default Profile;