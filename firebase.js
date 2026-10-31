import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC5x5E7Lph7X_PmYMYQkaj0-1BKjXI8R44",
    authDomain: "nova-ai-a3a51.firebaseapp.com",
    projectId: "nova-ai-a3a51",
    messagingSenderId: "223450619262",
    appId: "1:223450619262:web:bc23a140519f91e2aae72f",
    measurementId: "G-Q5MS2L2ZRG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
