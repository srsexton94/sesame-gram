import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCGvxTnGFmJR-SM-i9DKUv5ezgSPtwNLWY",
  authDomain: "sesame-gram.firebaseapp.com",
  projectId: "sesame-gram",
  storageBucket: "sesame-gram.appspot.com",
  messagingSenderId: "743143774811",
  appId: "1:743143774811:web:a1bc1e628306bb9a317d7e",
  measurementId: "G-TT3KKPL31K"
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

export { firebase, FieldValue }
