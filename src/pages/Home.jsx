import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  
  const [inputTitle, setInputTitle] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [inputDesc, setInputDesc] = useState(""); 
  
  const [editId, setEditId] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/movies');
        setMovies(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setInputImage(reader.result); 
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (movie) => {
    setEditId(movie.id);
    setInputTitle(movie.title);
    setInputDesc(movie.desc || ""); 
    setInputImage(movie.image);
    
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    resetForm();
  };

  const resetForm = () => {
      setInputTitle("");
      setInputDesc("");
      setInputImage(null);
      document.getElementById('fileInput').value = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      alert("Judul dan Deskripsi wajib diisi!");
      return;
    }

    const finalImage = inputImage || "https://via.placeholder.com/300x450?text=No+Image";

    try {
      if (editId) {
        const response = await axios.patch(`http://localhost:3001/movies/${editId}`, {
          title: inputTitle,
          image: finalImage,
          desc: inputDesc,
        });
        setMovies(movies.map(movie => movie.id === editId ? response.data : movie));
        setEditId(null);
        alert("Film berhasil diupdate!");

      } else {
        const newMovie = {
          title: inputTitle,
          image: finalImage,
          tag: "New",
          desc: inputDesc
        };
        const response = await axios.post('http://localhost:3001/movies', newMovie);
        setMovies([...movies, response.data]);
        alert("Film berhasil ditambah!");
      }
      
      resetForm();

    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm("Yakin ingin menghapus film ini?")) {
      try {
        await axios.delete(`http://localhost:3001/movies/${id}`);
        setMovies(movies.filter((movie) => movie.id !== id));
      } catch (error) {
        console.error("Gagal menghapus:", error);
      }
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen text-white overflow-x-hidden">
      
      <nav className="flex justify-between items-center px-8 py-4 absolute top-0 left-0 w-full z-50 bg-transparent">
        <div className="text-3xl font-extrabold text-red-600 cursor-pointer">
            <Link to="/">CHILL</Link>
        </div>
        <div className="flex items-center gap-8">
            <ul className="hidden md:flex gap-6 text-gray-300 text-sm font-medium">
                <li className="hover:text-white transition"><Link to="/series">Series</Link></li>
                <li className="hover:text-white transition"><Link to="/film">Film</Link></li>
                <li className="hover:text-white transition"><Link to="/daftar-saya">Daftar Saya</Link></li>
            </ul>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600 cursor-pointer hover:border-white transition">
                <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" alt="User Avatar" className="w-full h-full object-cover"/>
            </div>
        </div>
      </nav>

      <header className="relative h-[85vh] flex items-center bg-[url('https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg')] bg-cover bg-top">
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/50"></div>
        <div className="container mx-auto px-8 relative z-10 pt-20">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">The Last of Us</h1>
            <p className="text-lg mb-6 max-w-xl text-gray-200 drop-shadow-md">
                Wabah jamur menghancurkan dunia. Joel harus melindungi Ellie dalam perjalanan melintasi Amerika yang berbahaya.
            </p>
            <Button text="Mulai Nonton" variant="primary" className="w-fit shadow-xl" />
        </div>
      </header>

      <section className="container mx-auto px-8 py-10 pb-20 relative z-20 -mt-10">
        
        <div ref={formRef} className="mb-12 p-6 bg-gray-900/90 backdrop-blur rounded-xl border border-gray-700 max-w-lg shadow-2xl transition-all duration-300">
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${editId ? 'text-blue-400' : 'text-white'}`}>
                {editId ? "✏️ Edit Film" : "🎥 Upload Film Baru"}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Judul Film</label>
                    <input 
                        type="text" 
                        placeholder="Contoh: The Avengers..." 
                        className="w-full bg-black/50 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 outline-none transition"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Deskripsi / Sinopsis</label>
                    <textarea 
                        rows="3"
                        placeholder="Ceritakan sedikit tentang film ini..." 
                        className="w-full bg-black/50 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 outline-none transition resize-none"
                        value={inputDesc}
                        onChange={(e) => setInputDesc(e.target.value)}
                    />
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">{editId ? "Ganti Poster (Opsional):" : "Pilih Poster:"}</label>
                    <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"/>
                </div>

                {inputImage && (
                    <div className="w-full h-48 overflow-hidden rounded-md border border-gray-600 mt-2 bg-black relative">
                        <img src={inputImage} alt="Preview" className="w-full h-full object-contain" />
                        {editId && <span className="absolute bottom-2 right-2 bg-black/70 text-xs px-2 py-1 rounded">Poster Saat Ini</span>}
                    </div>
                )}

                <div className="flex gap-2 mt-2">
                    <button type="submit" className={`flex-1 px-6 py-3 rounded-lg font-bold transition shadow-md ${editId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}>
                        {editId ? "Simpan Perubahan" : "Tambah Ke Daftar"}
                    </button>
                    
                    {editId && (
                        <button type="button" onClick={handleCancelEdit} className="px-4 py-3 rounded-lg font-bold bg-gray-600 hover:bg-gray-500 transition">
                            Batal
                        </button>
                    )}
                </div>
            </form>
        </div>

        <h2 className="text-2xl font-bold mb-6 drop-shadow-md">Daftar Film Kamu ({movies.length})</h2>
        <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onEdit={handleEditClick} onDelete={handleDeleteMovie} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;