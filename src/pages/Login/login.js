import './login.scss'
import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../../context/firebase'

export default function Login() {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [emailAdress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvalid = password === '' || emailAdress ===''

  const handleLogin = () => {}

  useEffect(() => {
    document.title = 'Login - SesameGram'
  }, [])

  return (
    <section className="login-section">
      <h1 className="login-title">SesameGram - Login:</h1>
      { error && <p>{ error }</p> }
      <form className="signin-form" onSubmit={handleLogin} method="POST">
        <input type="text" placeholder="Email address" aria-label="Enter email address"/>
        <input type="text" placeholder="Password" aria-label="Enter password"/>
        <button type="submit">
          Submit
        </button>
      </form>
    </section>
  )
}