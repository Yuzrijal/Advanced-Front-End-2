import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DetailMovie = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Ambil SATU data film berdasarkan ID
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="bg-[#181818] min-h-screen text-white relative">
      {/* Background Poster Besar */}
      <div 
        className="w-full h-[60vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${movie.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/60"></div>
        
        <div className="absolute top-6 left-6">
            <Link to="/" className="bg-black/50 px-4 py-2 rounded text-white border border-gray-500 hover:bg-red-600 transition">
                ← Kembali
            </Link>
        </div>
      </div>

      {/* Konten Detail */}
      <div className="container mx-auto px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Poster Kecil */}
            <img 
                src={movie.image} 
                alt={movie.title} 
                className="w-64 rounded-lg shadow-2xl border-4 border-gray-800 hidden md:block"
            />
            
            {/* Teks Info */}
            <div className="mt-10 md:mt-0">
                <h1 className="text-5xl font-extrabold mb-4">{movie.title}</h1>
                <span className="bg-red-600 px-3 py-1 rounded text-sm font-bold">{movie.tag}</span>
                
                <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-2xl">
                    {movie.desc || "Tidak ada deskripsi untuk film ini."}
                </p>

                <div className="mt-8 flex gap-4">
                    <button className="bg-white text-black px-8 py-3 font-bold rounded hover:bg-gray-200 transition">
                        ▶ Play Movie
                    </button>
                    <button className="bg-gray-600/80 text-white px-8 py-3 font-bold rounded hover:bg-gray-500 transition">
                        + My List
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;