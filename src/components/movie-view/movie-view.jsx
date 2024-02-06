import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { BookmarkHeart, BookmarkHeartFill } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { MovieCard } from '../movie-card/movie-card';

export const MovieView = ({ movies, removeFav, addFav }) => {
    console.log(movies);
    const { movieId } = useParams();
    console.log(movieId);
    const movie = movies.find((m) => m._id === movieId);

    // Similar Movies
    const selectedMovie = movies.find((m) => m._id === movieId);
    let similarMovies = movies.filter((m) => {
        return m._id !== movieId && m.genre === selectedMovie.genre;
    });

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    return (
        <Card>
            <Card.Img variant='top' src={movie?.image} />
            <Card.Body>
                <Card.Title>{movie?.title}</Card.Title>

                <Card.Text>
                    Director: {movie?.director}
                    <br />
                    Release Year: {movie?.releaseYear}
                    <br />
                    Genre: {movie?.genre}
                    <br />
                    Description: {movie?.description}
                    <br />
                </Card.Text>

                <Link to={`/`}>
                    <Button variant='dark'>Back</Button>
                </Link>
            </Card.Body>
            <Card.Body>
                <Card.Title>Similar Movies</Card.Title>

                <Row>
                    {similarMovies.length !== 0 ? (
                        similarMovies.slice(0, 5).map((movie) => (
                            <Col
                                sm={6}
                                md={4}
                                className='mx-2 col-4'
                                key={movie._id}
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
                        ))
                    ) : (
                        <Col>
                            <p>There are no similar Movies</p>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>
    );
};
