// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm4aDJ-g-UehALCEPvuzqNeLmQfUW4M8Q",
  authDomain: "revisiontracker-dc145.firebaseapp.com",
  projectId: "revisiontracker-dc145",
  storageBucket: "revisiontracker-dc145.appspot.com",
  messagingSenderId: "140685845306",
  appId: "1:140685845306:web:3861b3a78048d253c46603",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Function to sign up a user
function signUpUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // Sign-up successful
      // You can handle the redirect or other actions here
    })
    .catch((error) => {
      // Handle sign-up errors (e.g., display error message)
      const errorText = document.getElementById("errorText");
      errorText.textContent = error.message;
      errorText.classList.remove("hidden");
    });

  // Prevent the form from submitting (this is done automatically by Firebase)
  return false;
}

// Function to sign in a user
function signInUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Sign-in successful
      // You can handle the redirect to the dashboard or other actions here
    })
    .catch((error) => {
      // Handle sign-in errors (e.g., display error message)
      const errorText = document.getElementById("errorText");
      errorText.textContent = error.message;
      errorText.classList.remove("hidden");
    });

  // Prevent the form from submitting (this is done automatically by Firebase)
  return false;
}

// Function to log out a user
function logout() {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful
      // Redirect to the Sign-In page after logging out or perform other actions
    })
    .catch((error) => {
      // An error occurred during sign-out
      console.error(error);
    });
}
