import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa79FFGGrCgkDYBwF7BvB8cFXb29xVV6Q",
  authDomain: "proyectosla.firebaseapp.com",
  projectId: "proyectosla",
  storageBucket: "proyectosla.firebasestorage.app",
  messagingSenderId: "225450656642",
  appId: "1:225450656642:web:dc2bb29cd880f4739d859b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar auth y provider de Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

export { auth, googleProvider, db, signOut };