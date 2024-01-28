import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const MovieView = ({ movies }) => {
    const { movieID } = useParams();
    console.log(movieID);
    const movie = movies.find((m) => {
        m._id === movieID;
        console.log(m);
    });
    console.log(movies);
    console.log(movie);

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
                </Card.Text>
                <Link to={`/`}>
                    <Button variant='dark'>Back</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
