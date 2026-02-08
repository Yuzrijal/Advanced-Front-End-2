import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="min-w-[200px] h-[350px] relative group rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
      
      <Link to={`/movie/${movie.id}`}>
        <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-lg">{movie.title}</h3>
            <span className="text-yellow-400 text-xs">{movie.tag}</span>
        </div>
      </Link>

      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button onClick={() => onEdit(movie)} className="bg-blue-600 text-white p-1 rounded text-xs hover:bg-blue-700">✏️</button>
        <button onClick={() => onDelete(movie.id)} className="bg-red-600 text-white p-1 rounded text-xs hover:bg-red-700">🗑️</button>
      </div>
    </div>
  );
};

export default MovieCard;