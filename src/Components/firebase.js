import { initializeApp } from "firebase/app"
import "firebase/storage"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAE0NLG4vZkocIeSBKRLs7m_o9TZqA7kYM",
  authDomain: "dep-2023-t17.firebaseapp.com",
  projectId: "dep-2023-t17",
  storageBucket: "dep-2023-t17.appspot.com",
  messagingSenderId: "242677142770",
  appId: "1:242677142770:web:1dd2d01d4e9936de032c6b",
  measurementId: "G-5EX565D71M"
};
// const firebaseConfig = {
//     apiKey: "AIzaSyBWfkXl2JqTZoPOMOvEzO3-agI80cvaYqY",
//     authDomain: "dep-2020-e752b.firebaseapp.com",
//     projectId: "dep-2020-e752b",
//     storageBucket: "dep-2020-e752b.appspot.com",
//     messagingSenderId: "1009135946766",
//     appId: "1:1009135946766:web:4e5675ce2455292127405f",
//     measurementId: "G-NMTXNLG4B2"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const auth = getAuth(app)
export { auth, storage }
