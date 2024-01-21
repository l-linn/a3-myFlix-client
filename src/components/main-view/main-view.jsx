import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [movies, setMovies] = useState([]); //array destructure
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://movies-flix-lin-66267be64a83.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }})
    .then((response) => response.json())
    .then((data) => {
      console.log('movies from api:', data);

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
  }, [token]);

  return (
    <Row className="justify-content-md-center"> 
      {!user ? (
        <Col md={5}>
          Please log in your account
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          <br></br>
          or please sign up below
          <SignupView />
        </Col>
      ) : selectedMovie ? (
     <Col md={8}> <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /> </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-5' key={movie.id} md={3}>
              <MovieCard
                //key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );

  //original code below
  // if (!user) {
  //   return (
  //     <>
  //       <LoginView 
  //       onLoggedIn={(user, token) => {
  //         setUser(user);
  //         setToken(token);
  //       }} />
  //       or please sign up below
  //       <SignupView />
  //     </>
  //   );
  // }

  // if (selectedMovie) {
  //   return (
  //     <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  //   );
  // }

  // if (movies.length === 0) {
  //   return <div>The list is empty.</div>;
  // }

  // return (
  //   <div>
  //     {movies.map((movie) => {
  //       return (
  //         <MovieCard
  //           key={movie.id}
  //           movie={movie}
  //           onMovieClick={(newSelectedMovie) => {
  //             setSelectedMovie(newSelectedMovie);
  //           }}
  //         />
  //       );
  //     })}
  //     <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  //   </div>
  // );
};