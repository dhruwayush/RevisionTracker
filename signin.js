// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAm4aDJ-g-UehALCEPvuzqNeLmQfUW4M8Q",
  authDomain: "revisiontracker-dc145.firebaseapp.com",
  projectId: "revisiontracker-dc145",
  storageBucket: "revisiontracker-dc145.appspot.com",
  messagingSenderId: "140685845306",
  appId: "1:140685845306:web:3861b3a78048d253c46603",
  measurementId: "G-3CXTB499EB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Function to sign in a user
function signInUser() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorText = document.getElementById("errorText");

  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Sign-in successful
      const user = userCredential.user;
      window.location.href = "index.html"; // Redirect to index.html
    })
    .catch((error) => {
      // Handle sign-in errors (e.g., display error message)
      errorText.textContent = error.message;
      errorText.classList.remove("hidden");
    });

  // Prevent the form from submitting (this is done automatically by Firebase)
  return false;
}

// Function to display or hide the error message
function toggleErrorText() {
  const errorText = document.getElementById("errorText");
  errorText.textContent = "";
  errorText.classList.add("hidden");
}

// Attach a click event to the "Sign In" button
document.getElementById("signInForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  toggleErrorText(); // Hide any previous error message
  signInUser(); // Attempt to sign in the user
});
