import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa79FFGGrCgkDYBwF7BvB8cFXb29xVV6Q",
  authDomain: "proyectosla.firebaseapp.com",
  projectId: "proyectosla",
  storageBucket: "proyectosla.firebasestorage.app",
  messagingSenderId: "225450656642",
  appId: "1:225450656642:web:dc2bb29cd880f4739d859b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider};