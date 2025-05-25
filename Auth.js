// Authentication functionality
function login(event) {
  event.preventDefault();
  // In a real application, this would validate and send credentials to a server
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (email && password) {
    // Simulate login
    window.location.href = 'Onbording.html';
  } else {
    alert('Please enter both email and password');
  }
}

function socialLogin(provider) {
  // In a real application, this would authenticate with the social provider
  console.log(`Logging in with ${provider}`);
  window.location.href = 'onboarding.html';
}

function toggleForm(event) {
  event.preventDefault();
  const loginForm = document.getElementById('loginForm');
  const formTitle = document.querySelector('.auth-content h2');
  const formPrompt = document.querySelector('.signup-prompt');
  const submitButton = document.querySelector('.btn-primary');
  
  if (loginForm.dataset.mode === 'signup') {
    // Switch to login
    formTitle.textContent = 'Welcome to SmartEats!';
    submitButton.textContent = 'Log in';
    formPrompt.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleForm(event)">Sign up</a>';
    loginForm.dataset.mode = 'login';
  } else {
    // Switch to signup
    formTitle.textContent = 'Create your account';
    submitButton.textContent = 'Sign up';
    formPrompt.innerHTML = 'Already have an account? <a href="#" onclick="toggleForm(event)">Log in</a>';
    loginForm.dataset.mode = 'signup';
  }
}