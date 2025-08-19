import {initializeApp} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {getAuth, GoogleAuthProvider, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCTvxDzvMWRYq6WIbjJtrl1mBLiszROMRE",
    authDomain: "teak-store-466823-e8.firebaseapp.com",
    projectId: "teak-store-466823-e8",
    storageBucket: "teak-store-466823-e8.firebasestorage.app",
    messagingSenderId: "83050040422",
    appId: "1:83050040422:web:782fc01b16534bd5ec31a7"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {

    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
        console.log(user)
        const docRef = doc(db, "users", loggedInUserId);

        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
            } else {
                console.log("ID não encontrado no Documento")
            }
        })
        .catch((error) => {
            console.log("documento não encontrado")
        })
    } else {
        console.log("Id de usuário não encontrado no localStorage")
    }
    
})

const logoutButton = document.getElementById('logout')
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedinUserId')
    signOut(auth)
        .then(() => {
            window.location.href = "index.html"
        })
        .catch((error) => {
            console.log('Error signing out:', error)
        })
})