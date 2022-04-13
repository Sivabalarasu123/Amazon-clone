import firebase from 'firebase/compat/app'
// import { initializeApp } from 'firebase/app'
import 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC08XUtDfhxHTXv4OpwKvarNk1EAwlnApg',
  authDomain: 'clone-fb65a.firebaseapp.com',
  projectId: 'clone-fb65a',
  storageBucket: 'clone-fb65a.appspot.com',
  messagingSenderId: '251618092268',
  appId: '1:251618092268:web:e96ff922550ae55c2cf1c9',
}
//nitialize app
const firebaseApp = firebase.initializeApp(firebaseConfig)

//initialize firebase database
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
