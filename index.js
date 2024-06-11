// Function to register a new user
export function register() {
  // Get all our input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
      alert('Email or Password is Outta Line!!');
      return;
  }

  // Move on with Auth
  createUserWithEmailAndPassword(window.auth, email, password)
      .then((userCredential) => {
          // Declare user variable
          const user = userCredential.user;

          // Add this user to Firebase Firestore
          const userRef = doc(window.db, 'users', user.uid);

          // Create User data
          const user_data = {
              email: email,
              full_name: full_name,
              last_login: Date.now()
          };

          // Push to Firebase Firestore
          setDoc(userRef, user_data);

          // Done
          alert('User Created!!');
      })
      .catch((error) => {
          // Firebase will use this to alert of its errors
          const error_message = error.message;
          alert(error_message);
      });
}

// Function to login a user
export function login() {
  // Get all our input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
      alert('Email or Password is Outta Line!!');
      return;
  }

  signInWithEmailAndPassword(window.auth, email, password)
      .then((userCredential) => {
          // Declare user variable
          const user = userCredential.user;

          // Add this user to Firebase Firestore
          const userRef = doc(window.db, 'users', user.uid);

          // Create User data
          const user_data = {
              last_login: Date.now()
          };

          // Push to Firebase Firestore
          updateDoc(userRef, user_data);

          // Done
          alert('User Logged In!!');
      })
      .catch((error) => {
          // Firebase will use this to alert of its errors
          const error_message = error.message;
          alert(error_message);
      });
}

// Validate Functions
function validate_email(email) {
  const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expression.test(email);
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  return password.length >= 6;
}

function validate_field(field) {
  return field != null && field.length > 0;
}

// Attach functions to window object
window.register = register;
window.login = login;
