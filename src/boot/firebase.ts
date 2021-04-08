import firebase from 'firebase/app'

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

firebase.initializeApp(process.env.firebaseConfig as unknown as FirebaseConfig)
