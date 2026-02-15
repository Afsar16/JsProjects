import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-semibold text-university-blue">SIS Login</h2>
        <p className="mb-4 text-sm text-slate-500">Peer Learning & Academic Support</p>
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <input className="mb-3 w-full rounded border p-2" placeholder="Email" value={formData.email} onChange={(e)=>setFormData((p)=>({...p,email:e.target.value}))} />
        <input type="password" className="mb-3 w-full rounded border p-2" placeholder="Password" value={formData.password} onChange={(e)=>setFormData((p)=>({...p,password:e.target.value}))} />
        <button className="w-full rounded bg-university-blue py-2 text-white">Login</button>
        <p className="mt-3 text-sm">New student? <Link to="/register" className="text-university-blue">Register</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
