import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link
import { QRCodeCanvas } from 'qrcode.react';
import './login.css';

export default function Login() {
  const [qrToken] = useState('demo_qr_code_123');
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Email or Phone Number and Password are required.');
      return;
    }

    // ***NO BACKEND - DEMO ONLY - REPLACE WITH REAL AUTHENTICATION***
    if (username === 'testuser' && password === 'password') {
      localStorage.setItem('token', 'fake_token');
      // Redirect after successful login
      router.push('/dashboard'); // Uncomment and adjust if you have a dashboard route
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
            <div className="blue"></div> 
      <div className="login-box">
        <button onClick={() => router.push('/')} className="go-back-button">
          Go Back
        </button>
        <div className="login-form">
          <h2>Welcome back!</h2>
          <p>We're so excited to see you again!</p>

          <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>

            <a href="#" className="forgot-password">Forgot Password?</a>
          </form>

          <p className="register-link">Need an account? <a href="#">Register</a></p>
        </div>

        <div className="qr-code-section">
          <h3>Log in With QR Code</h3>
          <QRCodeCanvas value={qrToken} size={150} />
          <p>Scan this with the mobile app to log in instantly</p>
        </div>
        <Link href="OJTMonitoringDashboard" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
              Go to Login  {/* Consider changing this to a more appropriate link */}
            </Link>
      </div>
    </div>
  );
}