import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../redux/slices/authSlice';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { status, error } = useSelector((state) => state.auth);
  const email = state?.email || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ email, otp })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/login');
      }
    });
  };

  return (
    <div className="form-container">
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to {email}</p>
      {error && <p className="error">{error}</p>}
      {status === 'loading' && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={status === 'loading'}>
          Verify
        </button>
      </form>
    </div>
  );
}

export default OtpVerification;