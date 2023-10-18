// Firebase configuration (same as script.js)
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

// Initialize Firebase Authentication (same as script.js)
const auth = firebase.auth();

// Function to sign up a user (unchanged)
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

      user.updateProfile({
        displayName: name,
      }).then(() => {
        window.location.href = "index.html";
      }).catch((profileError) => {
        const errorText = document.getElementById("errorText");
        errorText.textContent = profileError.message;
        errorText.classList.remove("hidden");
      });
    })
    .catch((error) => {
      const errorText = document.getElementById("errorText");
      errorText.textContent = error.message;
      errorText.classList.remove("hidden");
    });

  return false;
}
