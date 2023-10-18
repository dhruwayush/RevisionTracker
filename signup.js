function signUpUser() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value;
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Sign-up successful
      // Redirect to the index page after signing up
      window.location.href = "index.html";
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
