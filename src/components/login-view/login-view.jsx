import React from 'react';
import { useState } from 'react';

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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then((response)=> response.json())
    .then((data) => {
      console.log('Login response:', data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert ('No such user');
      }
    }).catch((err)=> {
      alert ('Something is broken..')
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)} required
        />
      </label>

      <label>
        Password:
        <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)} required
        />
      </label>

      <button type='submit' method='post'>Submit</button>
    </form>
  );
};

export { LoginView };