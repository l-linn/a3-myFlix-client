import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="dark">
          Read More
        </Button>
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
    description:PropTypes.string.isRequired
  })
}
export { MovieCard };