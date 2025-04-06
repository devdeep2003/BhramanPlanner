
import { initializeApp } from "firebase/app";
import {getFirestore} from"firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC79qEpBe2s3QmPf7Dx1evfQafpV1Zh5YA",
  authDomain: "bhramanplanner.firebaseapp.com",
  projectId: "bhramanplanner",
  storageBucket: "bhramanplanner.firebasestorage.app",
  messagingSenderId: "296085934610",
  appId: "1:296085934610:web:5a02ce082711eeedc33ecb",
  measurementId: "G-F8LCZHB9S5"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
