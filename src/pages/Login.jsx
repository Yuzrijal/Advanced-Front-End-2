import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-black">
      <div 
        className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/ID-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center opacity-50"
      ></div>

      <div className="relative z-10 bg-black/80 p-10 rounded-2xl w-full max-w-md border border-gray-800 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Masuk</h1>
            <p className="text-gray-400">Selamat datang kembali di Chill!</p>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
            <Input label="Username" type="text" placeholder="Masukkan username" />
            <Input label="Kata Sandi" type="password" placeholder="Masukkan kata sandi" />
            
            <div className="mt-8 mb-4">
                <Button text="Masuk" variant="primary" type="submit" />
            </div>

            <div className="text-center">
                <p className="text-gray-400">Belum punya akun? <Link to="/register" className="text-white font-bold hover:text-red-500 transition">Daftar</Link></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;