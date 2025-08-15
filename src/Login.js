import React from 'react';

import Container from'react-bootstrap/Container';
import './Login.css';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=863823f6ace345c1abaf27b438f2e41e&response_type=code&redirect_uri=http://127.0.0.1:3000/callback&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";


export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  )
}