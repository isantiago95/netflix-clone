// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAzF2hPn6vEAW10CufEp2p4wgdFUlfOXNw',
  authDomain: 'netflix-clone-93c94.firebaseapp.com',
  projectId: 'netflix-clone-93c94',
  storageBucket: 'netflix-clone-93c94.appspot.com',
  messagingSenderId: '121851291952',
  appId: '1:121851291952:web:d1d159558cf346c3a300f5',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
