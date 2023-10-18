function signUpUser() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameInput = document.getElementById("name"); // Add this line

  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value; // Add this line

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
