// Firebase configuration (same as signup.js)

// Initialize Firebase Authentication (same as signup.js)

// Function to sign in a user
function signInUser() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Sign-in successful
      // Redirect to the index page after signing in
      window.location.href = "index.html";
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
