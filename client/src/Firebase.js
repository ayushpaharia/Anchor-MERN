import firebase from "firebase";
import { firebase_config } from "./config";

const firebaseApp = firebase.initializeApp(firebase_config);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
