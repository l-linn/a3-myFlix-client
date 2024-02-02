import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Container, Button, Card, Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { PersonSquare } from 'react-bootstrap-icons';
import Carousel from 'react-bootstrap/Carousel';
import moment from 'moment';

export const ProfileView = ({ user, movies, setUser, removeFav, addFav }) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);
    const [password, setPassword] = useState(user.password);

    // Navigate
    const navigate = useNavigate();

    // Return list of favorite Movies
    const favoriteMovies = movies.filter((m) => user.favorites.includes(m._id));

    // Token
    const token = localStorage.getItem('token');

    // Update user info
    const handleUpdate = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            username: username,
            email: email,
            birthday: birthday,
            password: password,
        };

        fetch(
            `https://movies-flix-lin-66267be64a83.herokuapp.com/users/${user.username}/profile`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(async (response) => {
                console.log(response);
                if (response.ok) {
                    const updatedUser = await response.json();
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    alert('Update was successful');
                } else {
                    alert('Update failed');
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    };

    // Delete User
    const handleDelete = () => {
        fetch(
            `https://movies-flix-lin-66267be64a83.herokuapp.com/users/${user.username}/setting`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((response) => {
            if (response.ok) {
                setUser(null);
                alert('User has been deleted');
                localStorage.clear();
                navigate('/'); // go back to home page
            } else {
                alert('Something went wrong.');
            }
        });
    };

    return (
        <Container className='my-4'>
            <Row>
                <Col md={4} className='text-center text-md-start ms-4'>
                    <Card border='warning'>
                        <Card.Body>
                            <Card.Title>My Profile</Card.Title>
                            <PersonSquare
                                variant='top'
                                color='gray'
                                className='my-4'
                                size={100}
                            />
                            <Card.Text>Username: {user.username}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            <Card.Text>
                                Birthday:{' '}
                                {moment(user.birthday)
                                    .utc()
                                    .format('YYYY-MM-DD')}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={5} className='text-md-start ms-4'>
                    <Card border='info'>
                        <Card.Body>
                            <Card.Title>Update Profile</Card.Title>
                            <Form onSubmit={handleUpdate}>
                                <Form.Group controlId='formUsername'>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        className='mb-3'
                                        type='text'
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        minLength='5'
                                        placeholder='update username'
                                    />
                                </Form.Group>
                                <Form.Group controlId='formPassword'>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        className='mb-3'
                                        type='password'
                                        placeholder='update password'
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId='formEmail'>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        className='mb-3'
                                        type='email'
                                        placeholder='update email'
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId='formBirthday'>
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        className='mb-2'
                                        type='date'
                                        value={birthday}
                                        onChange={(e) =>
                                            setBirthday(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Button
                                    type='submit'
                                    onClick={handleUpdate}
                                    className='mt-3 me-2'
                                    variant='dark'
                                >
                                    Update
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    className='mt-3'
                                    variant='info'
                                >
                                    Delete User
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <h3 className='mt-4 text-md-start'>Favorite Movies</h3>
                <Row>
                    {favoriteMovies?.length !== 0 ? (
                        favoriteMovies?.map((movie) => (
                            <Col
                                sm={7}
                                md={5}
                                lg={3}
                                xl={3}
                                className='mx-2 mb-5 col-6'
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
                            <p>There are no favorite movies</p>
                        </Col>
                    )}
                </Row>
            </Row>
        </Container>
    );
};
