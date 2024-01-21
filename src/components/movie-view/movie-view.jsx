import { Button, Card } from "react-bootstrap";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>

        <Card.Text>
          Director: {movie.director}<br/>
          Release Year: {movie.releaseYear}<br/>
          Genre: {movie.genre}<br/>
          Description: {movie.description}
        </Card.Text>

        <Button onClick={onBackClick} variant="dark">Back</Button>
      </Card.Body>
    </Card>
  );
};

export { MovieView };
