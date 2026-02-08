import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181818] text-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Daftar</h1>
        <p className="text-center text-gray-400 mb-8">Selamat datang di Chill!</p>
        
        <form onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
            <Input label="Nama Lengkap" type="text" placeholder="Masukkan nama anda" />
            <Input label="Email" type="email" placeholder="Masukkan alamat email" />
            <Input label="Kata Sandi" type="password" placeholder="Masukkan kata sandi" />
            <Input label="Konfirmasi Kata Sandi" type="password" placeholder="Ulangi kata sandi" />
            
            <div className="mt-8 mb-4">
                <Button text="Daftar Sekarang" variant="primary" type="submit" />
            </div>

            <div className="text-center">
                <p className="text-gray-400">Sudah punya akun? <Link to="/" className="text-white font-bold hover:text-red-500">Masuk</Link></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Register;