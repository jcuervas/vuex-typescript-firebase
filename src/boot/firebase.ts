import firebase from 'firebase/app'
import { boot } from 'quasar/wrappers'

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
export default boot(({ app }) => {
  firebase.initializeApp(process.env.firebaseConfig as unknown as FirebaseConfig)
})
