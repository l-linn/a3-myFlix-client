import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Container, Button, Card, Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import moment from 'moment';

export const ProfileView = ({ user, movies, setUser, removeFav, addFav }) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);

    // Navigate
    const navigate = useNavigate();

    // Return list of favorite Movies
    const favoriteMovieList = movies.filter((m) =>
        user.favorites.includes(m._id)
    );

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
        };

        fetch(
            `https://movies-flix-lin-66267be64a83.herokuapp.com/users/${user.username}`,
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
            `https://movies-flix-lin-66267be64a83.herokuapp.com/users/${user.username}`,
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
        <Container className='my-5'>
            <Row>
                <Col md={4} className='text-center text-md-start ms-3'>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Profile</Card.Title>
                            <Card.Text>Username:{user.username}</Card.Text>
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
                <Col md={7} className='mt-5'>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId='formUsername'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                className='mb-3'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength='5'
                            />
                        </Form.Group>
                        <Form.Group controlId='formEmail'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                className='mb-3'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='formBirthday'>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                className='mb-2'
                                type='date'
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            type='submit'
                            onClick={handleUpdate}
                            className='mt-3 me-2'
                        >
                            Update
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className='mt-3 bg-danger border-danger text-white'
                        >
                            Delete User
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <h2 className='mt-5 text-center text-md-start'>
                    Favorite Movies
                </h2>
                <Row className='justify-content-center'>
                    {favoriteMovieList?.length !== 0 ? (
                        favoriteMovieList?.map((movie) => (
                            <Col
                                sm={7}
                                md={5}
                                lg={3}
                                xl={2}
                                className='mx-2 mt-2 mb-5 col-6'
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
