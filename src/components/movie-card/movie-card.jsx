import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookmarkHeart, BookmarkHeartFill } from 'react-bootstrap-icons';
import { MovieView } from '../movie-view/movie-view';
import Container from 'react-bootstrap/Container';

const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
    return (
        <Card className='h-100 card-shadow'>
            <Card.Img variant='top' src={movie.image} />
            <div>
                {isFavorite ? (
                    <BookmarkHeartFill
                        size={30}
                        color='red'
                        className='mt-2 me-2 top-0 end-0'
                        onClick={() => removeFav(movie._id)}
                    />
                ) : (
                    <BookmarkHeart
                        size={30}
                        color='red'
                        className='mt-2 me-2 top-0 end-0'
                        onClick={() => addFav(movie._id)}
                    />
                )}
            </div>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant='dark'>Read More</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
        genre: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
};
export { MovieCard };
