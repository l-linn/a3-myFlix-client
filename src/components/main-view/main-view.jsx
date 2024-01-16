import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]); //array destructure
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://movies-flix-lin-66267be64a83.herokuapp.com/movies')
    .then((response) => response.json())
    .then((data) => {
      console.log("movies from api:", data);

      const moviesFromApi = data.map((movie) => {
        return {
          id: movie._id,
          title: movie.title,
          image: movie.image,
          director: movie.director.name,
          releaseYear: movie.releaseYear,
          genre: movie.genre.type,
          description: movie.description
        };
      });
      setMovies(moviesFromApi);

    });
  }, []);

  if (!user) {
    return <LoginView />;
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty.</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
