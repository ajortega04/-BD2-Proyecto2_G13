import "../styles/catalogomovies.css"; // Assuming you have a CSS file for styles
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Navbar from "../navbar/navbar_admin.js"
function Administrador() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Define the function to fetch movies
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/peliculas");
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching the movies:", error);
      }
    };

    // Call the function to fetch movies
    fetchMovies();
  }, []);

  const eliminarpeliculas = async (id) => {
    // Lógica para eliminar pelcula
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!'
      });
    
      // Si el usuario confirma la eliminación, enviar la solicitud DELETE
      if (result.isConfirmed) {
    try {
        const response = await axios.delete(`http://localhost:3000/api/peliculas/${id}`);
        setMovies(response.data);
        console.log(response.data);
        window.location.reload();
    } catch (error) {
      console.error("Error fetching the movies:", error);
    }
}
  };

  const actualizarpeliculas = (id,titulo,sinopsis,precio_alquiler,director,año_estreno,duracion,genero,imagen) => {
    // Lógica para devolver la película con el ID dado
  navigate("/actualizarpelicula", {
    state: {
      id: id,
      titulo: titulo,
      sinopsis: sinopsis,
      precio_alquiler: precio_alquiler,
      director: director,
      año_estreno: año_estreno,
      duracion: duracion,
      genero: genero,
      imagen: imagen,
    },
  });
   
  };

  return (
    <div >
        <Navbar></Navbar>
  
    <div className="catalogo-movies">
    
      {movies.map((movie) => (
        <figure className="movie" key={movie.id_peliculas}>
          <div className="movie__hero">
            <img
              src={
                movie.imagen ||
                "https://th.bing.com/th/id/OIP.OH2jIiAeGJWPnWDRSiStYQHaEK?rs=1&pid=ImgDetMain"
              }
              alt={movie.titulo}
              className="movie__img"
            />
          </div>
          <div className="movie__content">
            <div className="movie__title">
              <h1 className="heading__primary">
                {movie.titulo} <i className="fas fa-fire"></i>
              </h1>
              <div className="movie__tag movie__tag--1">#{movie.genero}</div>
            </div>

            <p className="movie__description">{movie.sinopsis}</p>
            <div className="movie__details">
              <p className="movie__detail">
                <span className="icons icons-red">
                  <i className="fas fa-camera-retro"></i>
                </span>{" "}
                {movie.director}
              </p>
              <p className="movie__detail">
                <span className="icons icons-grey">
                  <i className="fas fa-clock"></i>
                </span>{" "}
                {movie.duracion} min
              </p>
              <p className="movie__detail">
                <span className="icons icons-yellow">
                  <i className="fas fa-file-invoice-dollar"></i>
                </span>{" "}
                ${movie.precio_alquiler}
              </p>
              <button
                className="button-alquilar"
                onClick={() =>
                  eliminarpeliculas(
                    movie.id_peliculas,
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    fill="#F44336"
                    d="M21.5 4.5H26.501V43.5H21.5z"
                    transform="rotate(45.001 24 24)"
                  />
                  <path
                    fill="#F44336"
                    d="M21.5 4.5H26.5V43.501H21.5z"
                    transform="rotate(135.008 24 24)"
                  />
                </svg>
              </button>
              <button
                className="button-alquilar"
                onClick={() => actualizarpeliculas(movie.id_peliculas,movie.titulo,movie.sinopsis,movie.precio_alquiler,movie.director,movie.año_estreno,movie.duracion,movie.genero,movie.imagen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 512 512"
                  fill="none"
                  stroke="currentColor"
                  className="icon"
                >
                  <circle r="1" cy="21" cx="9"></circle>
                  <circle r="1" cy="21" cx="20"></circle>
                  <path
                    fill="#32BEA6"
                    d="M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z"
                  />
                  <path
                    fill="#FFF"
                    d="M436.2 180.1c-10.3 0-20.7.1-31 .1-23.3-52.2-69-89.9-126.6-98.9C214.2 71.2 152.7 101 116 153.6c-16.3 23.3 22 45.2 38.2 22 50.3-72 157.8-65.5 201.9 4.7-9.6 0-19.1 0-28.7.1-2.7 0-4.6 1.2-5.7 2.9-1.9 2.1-2.7 5.1-.6 8.2 18.2 28.2 36.4 56.5 54.6 84.7 3.1 4.7 9.7 4.7 12.7 0 18.1-28.3 36.1-56.7 54.2-85C445.5 186.4 441.5 180.1 436.2 180.1zM358.3 335.1c-49.9 71.5-156.1 65.6-200.9-3 9.2 0 18.3 0 27.5-.1 2.7 0 4.6-1.2 5.7-2.9 1.9-2.1 2.7-5.1.6-8.2-18.2-28.2-36.4-56.5-54.6-84.7-3.1-4.8-9.7-4.7-12.7 0-18.1 28.3-36.1 56.7-54.2 85-3 4.7.9 11 6.3 11 10.7 0 21.3-.1 32-.1 23.5 51.3 68.8 88.3 125.9 97.3 64.3 10.1 125.8-19.8 162.5-72.3C412.7 333.8 374.4 312 358.3 335.1z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="movie__price">${movie.precio_alquiler}</div>
        </figure>
      ))}
    </div>
    </div>
  );
}

export default Administrador;
