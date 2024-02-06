import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { BookmarkHeart, BookmarkHeartFill } from 'react-bootstrap-icons';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [movies, setMovies] = useState([]); //array destructure
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

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
        console.log(id);
        fetch(
            `https://movies-flix-lin-66267be64a83.herokuapp.com/users/${user.username}/favorites/${id}`,
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

    // Remove Favorite Movie
    const removeFav = (id) => {
        fetch(
            `https://movies-flix-lin-66267be64a83.herokuapp.com/users/${user.username}/favorites/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Failed to remove');
                }
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                    //setIsFavorite(false);
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
                                            removeFav={removeFav}
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
                                        <Form className='form-inline mt-2 mb-2 d-flex justify-content-center'>
                                            <Form.Control
                                                className='ms-5 mx-md-0'
                                                type='search'
                                                id='searchForm'
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                placeholder='Search for ...'
                                            />
                                            <Form.Select
                                                className='ms-1 ms-md-3 w-25'
                                                onChange={(e) =>
                                                    setSelectedGenre(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value='' selected>
                                                    Search by genre
                                                </option>
                                                <option value='Drama'>
                                                    Drama
                                                </option>
                                                <option value='Crime'>
                                                    Crime
                                                </option>
                                                <option value='Sci-Fi'>
                                                    Sci-Fi
                                                </option>
                                                <option value='Fantasy'>
                                                    Fantasy
                                                </option>
                                                <option value='Thriller'>
                                                    Thriller
                                                </option>
                                                <option value='Adventure'>
                                                    Adventure
                                                </option>
                                            </Form.Select>
                                        </Form>

                                        {movies
                                            .filter((movie) => {
                                                return selectedGenre === ''
                                                    ? movie
                                                    : movie.genre ===
                                                          selectedGenre;
                                            })
                                            .filter((movie) => {
                                                return search === ''
                                                    ? movie
                                                    : movie.title
                                                          .toLowerCase()
                                                          .includes(
                                                              search.toLowerCase()
                                                          );
                                            })
                                            .map((movie, movieId) => (
                                                <Col
                                                    md={6}
                                                    lg={4}
                                                    xl={3}
                                                    className='mb-5 col-8'
                                                    key={movieId}
                                                >
                                                    <MovieCard
                                                        movie={movie}
                                                        removeFav={removeFav}
                                                        addFav={addFav}
                                                        isFavorite={user.favorites.includes(
                                                            movie._id
                                                        )}
                                                    />
                                                </Col>
                                            ))}
                                        {/* {movies.map((movie) => (
                                            <Col
                                                className='mb-4'
                                                key={movie._id}
                                                md={3}
                                            >
                                                <MovieCard
                                                    movie={movie}
                                                    removeFav={removeFav}
                                                    addFav={addFav}
                                                    isFavorite={user.favorites.includes(
                                                        movie._id
                                                    )}
                                                />
                                            </Col>
                                        ))} */}
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
                                            removeFav={removeFav}
                                            addFav={addFav}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
