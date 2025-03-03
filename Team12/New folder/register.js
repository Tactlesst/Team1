import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import './register.css';

export default function Login() {
  const [qrToken] = useState('demo_qr_code_123');
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, consetPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Email or Phone Number and Password are required.');
      return;
    }

    if (password !== confpassword) {
      setError('Passwords do not match.');
      return;
    }

    // ***NO BACKEND - DEMO ONLY - REPLACE WITH REAL AUTHENTICATION***
    if (username === 'testuser' && password === 'password') {
      localStorage.setItem('token', 'fake_token');
      router.push('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="blue"></div> {/* Add the blue-fade here */}
      <div className="login-box">
        <button onClick={() => router.push('/')} className="go-back-button">
          Go Back
        </button>
        <div className="login-form">
          <p>Registration</p>

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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confpassword}
              onChange={(e) => consetPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>

          <p className="register-link">
            Log in <a href="#">Log in</a>
          </p>
        </div>
        <Link
          href="OJTMonitoringDashboard"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}