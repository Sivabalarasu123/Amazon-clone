import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
// import auth from 'firebase/compat/app'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = (e) => {
    e.preventDefault()
    //firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => navigate('/'))
      .catch((error) => alert(error.message))
  }

  const register = (e) => {
    e.preventDefault()
    //firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate('/')
        }
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://www.bgr.in/wp-content/uploads/2013/06/amazonIN_logo.jpg"
          alt="amazon logo"
        />
      </Link>
      <div className="login__container">
        <h1> Sign-In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login__signIn" onClick={signIn}>
            {' '}
            Sign in
          </button>
        </form>
        <p>
          By creating an account or logging in AMAZON CLONE , you agree to{' '}
          <space />
          <a href="#">Amazon’s Conditions</a> <space />
          of Use and <a href="#">Privacy Policy.</a>
        </p>
        <button className="login__register" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  )
}

export default Login
