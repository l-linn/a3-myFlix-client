import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view.jsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [movies, setMovies] = useState([]); //array destructure
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    //connect app to API with hook
    useEffect(() => {
        if (!token) return;

        fetch('https://movies-flix-lin-66267be64a83.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('movies from api:', data);

                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        title: movie.title,
                        image: movie.image,
                        director: movie.director.name,
                        releaseYear: movie.releaseYear,
                        genre: movie.genre.type,
                        description: movie.description,
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    // Add Favorite Movie
    const addFav = (id) => {
        fetch(
            `https://movies-flix-lin-66267be64a83.herokuapp.com/users/${user.username}/favorits/${id}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Failed to add');
                }
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                    //setIsFavorite(true);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    };

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className='justify-content-md-center'>
                <Routes>
                    <Route
                        path='/signup'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/login'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/movies/:movieId'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            movies={movies}
                                            addFav={addFav}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col
                                                className='mb-4'
                                                key={movie.id}
                                                md={3}
                                            >
                                                <MovieCard
                                                    //key={movie.id}
                                                    movie={movie}

                                                    // onMovieClick={(
                                                    //     newSelectedMovie
                                                    // ) => {
                                                    //     setSelectedMovie(
                                                    //         newSelectedMovie
                                                    //     );
                                                    // }}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/profile'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
                                            //removeFav={removeFav}
                                            addFav={addFav}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    {/* {!user ? (
                        <Col md={5}>
                            Please log in your account
                            <LoginView
                                onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }}
                            />
                            <br></br>
                            or please sign up below
                            <SignupView />
                        </Col>
                    ) : selectedMovie ? (
                        <Col md={8}>
                            {" "}
                            <MovieView
                                movie={selectedMovie}
                                onBackClick={() => setSelectedMovie(null)}
                            />{" "}
                        </Col>
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
                    )} */}
                </Routes>
            </Row>
        </BrowserRouter>
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
