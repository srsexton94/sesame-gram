import './signup.scss'
import { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { doesUsernameExist } from '../../services/firebase'
import { FirebaseContext } from '../../context/firebase'
import { Routes } from '../../constants/routes'

export default function SignUp() {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isEmailValid = emailAddress && emailAddress.match(/^\w+@{1}\w+[.]{1}([a-zA-Z]{2,3})$/gi)
  const isFullNameValid = fullName && fullName.match(/^\w+(?:\s\w+)+$/gi)
  const isPasswordValid = password && password.length >= 6
  const isFormInvalid =  !username || !isFullNameValid || !isPasswordValid || !isEmailValid

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);

    if (usernameExists) {
      resetErroredOutForm('That username is already in use. Please try another.')
    } else {
      try { 
        await signUpUser() 
      } catch (error) { 
        resetErroredOutForm(error.message) 
      }
    }
  }

  const signUpUser = async () => {
    const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
    await createdUserResult.user.updateProfile({ displayName: username })
    const { uid: userId } = createdUserResult.user 

    await firebase.firestore().collection('users')
      .add({ userId, username, fullName, emailAddress, following: [], followers: [], dateCreated: Date.now() })

    history.push(Routes.DASHBOARD)
  }

  function resetErroredOutForm(errorMessage) {
    setUsername('')
    setFullName('');
    setEmailAddress('');
    setPassword('');
    setError(errorMessage)
  }

  useEffect(() => { document.title = 'Sign Up - Instagram' }, [])

  return (
    <section className="signup-section">
      <h1 className="signup-title">SesameGram - Signup:</h1>
      { error && <p className="error-message" role="alert">{ error }</p> }
      <form className="signup-form" onSubmit={ handleSignUp } method="POST">
        <input
          type="text" 
          placeholder="Username" 
          aria-label="Enter your username"
          aria-invalid={ !!username }
          onChange={({ target }) => setUsername(target.value.toLowerCase())}
          value={ username }
        />
        <input
          type="text" 
          placeholder="Full name" 
          aria-label="Enter your full name"
          aria-invalid={ !isFullNameValid }
          onChange={({ target }) => setFullName(target.value)}
          value={ fullName }
        />
        <input
          type="email" 
          placeholder="Email address" 
          aria-label="Enter email address"
          aria-invalid={ !isEmailValid }
          onChange={({ target }) => setEmailAddress(target.value.toLowerCase())}
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
          Sign up
        </button>
      </form>
      <div className="login-redirect">
        <p>Already have an account?</p>
        <Link className="login-link" to={ Routes.LOGIN }>
          Login now!
        </Link>
      </div>
    </section>
  )
}
