// Firebase configuration
var firebaseConfig = {
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
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Sign-up successful
      const user = userCredential.user;

      // Update the user's profile with their name
      user.updateProfile({
        displayName: name,
      }).then(() => {
        // Profile updated successfully
        window.location.href = "index.html";
      }).catch((profileError) => {
        // Handle profile update errors
        const errorText = document.getElementById("errorText");
        errorText.textContent = profileError.message;
        errorText.classList.remove("hidden");
      });
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
