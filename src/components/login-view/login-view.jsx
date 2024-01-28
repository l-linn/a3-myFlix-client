import React from 'react';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            username,
            password,
        };

        console.log(data);

        fetch('https://movies-flix-lin-66267be64a83.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Login response:', data);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert('No such user');
                }
            })
            .catch((err) => {
                alert('Something is broken..');
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='3'
                />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <br />

            <Button variant='dark' type='submit'>
                Log In
            </Button>
        </Form>
    );
};

export { LoginView };
