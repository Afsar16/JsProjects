import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', major: '', year: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-semibold text-university-blue">Student Registration</h2>
        {error && <p className="mb-3 mt-2 text-sm text-red-600">{error}</p>}
        {['name','email','major','year'].map((field) => (
          <input key={field} className="mb-3 w-full rounded border p-2" placeholder={field[0].toUpperCase()+field.slice(1)} value={formData[field]} onChange={(e)=>setFormData((p)=>({...p,[field]:e.target.value}))} />
        ))}
        <input type="password" className="mb-3 w-full rounded border p-2" placeholder="Password" value={formData.password} onChange={(e)=>setFormData((p)=>({...p,password:e.target.value}))} />
        <button className="w-full rounded bg-university-blue py-2 text-white">Register</button>
        <p className="mt-3 text-sm">Already have access? <Link to="/login" className="text-university-blue">Login</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
