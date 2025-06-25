const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const showLogin = document.getElementById("show-login");
    const showSignup = document.getElementById("show-signup");

    showLogin.onclick = () => {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
    };

    showSignup.onclick = () => {
      signupForm.style.display = "block";
      loginForm.style.display = "none";
    };