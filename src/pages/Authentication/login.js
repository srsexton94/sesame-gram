import './auth.scss'
import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FirebaseContext } from '../../context/firebase'
import { Routes } from '../../constants/routes'

export default function Login() {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const isEmailValid = emailAddress && emailAddress.match(/^\w+@{1}\w+[.]{1}([a-zA-Z]{2,3})$/gi)
  const isPasswordValid = password && password.length >= 6
  const isFormInvalid =  !isPasswordValid || !isEmailValid

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(Routes.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  }

  useEffect(() => {
    document.title = 'Login - SesameGram'
  }, [])

  return (
    <section className="auth-section">
      <h1 className="auth-title">SesameGram - Login:</h1>
      { error && <p className="error-message" role="alert">{ error }</p> }
      <form className="auth-form" onSubmit={ handleLogin } method="POST">
        <input
          type="email" 
          placeholder="Email address" 
          aria-label="Enter email address"
          aria-invalid={ !isEmailValid }
          onChange={({ target }) => setEmailAddress(target.value)}
          value={ emailAddress }
        />
        <input
          type="password" 
          placeholder="Password" 
          aria-label="Enter password"
          aria-invalid={ !isPasswordValid }
          onChange={({ target }) => setPassword(target.value)}
          value={ password }
        />
        <button type="submit" disabled={ isFormInvalid }>
          Login
        </button>
      </form>
      <div className="redirect-container">
        <p>Don't have an account yet?</p>
        <Link className="redirect-link" to={ Routes.SIGNUP }>
          Sign up now
        </Link>
      </div>
    </section>
  )
}
