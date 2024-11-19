document.addEventListener("DOMContentLoaded", () => {
    // Get form elements for both login and signup pages
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    // Validate login form if it exists
    if (loginForm) {
        validateLoginForm();
    }

    // Validate signup form if it exists
    if (signupForm) {
        validateSignupForm();
    }
});

// Function to validate the login form
function validateLoginForm() {
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Email validation on input
    emailInput.addEventListener("input", () => {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue.includes("@")) {
            emailError.textContent = "Invalid email address";
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = "Invalid email address";
        } else {
            emailError.textContent = "";
        }
    });

    // Password validation on input
    passwordInput.addEventListener("input", () => {
        const passwordValue = passwordInput.value;
        const minLength = 8;
        const uppercasePattern = /[A-Z]/;
        const digitPattern = /\d/g;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

        const digitMatches = passwordValue.match(digitPattern) || [];
        if (
            passwordValue.length < minLength ||
            !uppercasePattern.test(passwordValue) ||
            digitMatches.length < 3 ||
            !specialCharPattern.test(passwordValue)
        ) {
            passwordError.textContent = "Password must be at least 8 characters long, contain one uppercase letter, at least 3 digits, and one special character.";
        } else {
            passwordError.textContent = "";
        }
    });

    // Prevent submission if there are errors
    document.getElementById("login-form").addEventListener("submit", (event) => {
        if (emailError.textContent || passwordError.textContent) {
            event.preventDefault();
        }
    });
}

// Function to validate the signup form
function validateSignupForm() {
    const firstnameInput = document.getElementById("signup-firstname");
    const lastnameInput = document.getElementById("signup-lastname");
    const emailInput = document.getElementById("signup-email");
    const passwordInput = document.getElementById("signup-password");
    const confirmPasswordInput = document.getElementById("signup-confirm-password");

    const firstnameError = document.getElementById("firstname-error");
    const lastnameError = document.getElementById("lastname-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    // Email validation on input
    emailInput.addEventListener("input", () => {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue.includes("@")) {
            emailError.textContent = "Your email address must contain an '@' symbol.";
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = "Please enter a valid email address (e.g., user@example.com).";
        } else {
            emailError.textContent = "";
        }
    });

    // Password validation on input
    passwordInput.addEventListener("input", () => {
        const passwordValue = passwordInput.value;
        const minLength = 8;
        const uppercasePattern = /[A-Z]/;
        const digitPattern = /\d/g;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

        const digitMatches = passwordValue.match(digitPattern) || [];
        if (
            passwordValue.length < minLength ||
            !uppercasePattern.test(passwordValue) ||
            digitMatches.length < 3 ||
            !specialCharPattern.test(passwordValue)
        ) {
            passwordError.textContent = "Password must be at least 8 characters long, contain one uppercase letter, at least 3 digits, and one special character.";
        } else {
            passwordError.textContent = "";
        }
    });

    // Confirm password validation on input
    confirmPasswordInput.addEventListener("input", () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
        } else {
            confirmPasswordError.textContent = "";
        }
    });

    // Prevent submission if there are errors
    document.getElementById("signup-form").addEventListener("submit", (event) => {
        if (
            firstnameError.textContent ||
            lastnameError.textContent ||
            emailError.textContent ||
            passwordError.textContent ||
            confirmPasswordError.textContent
        ) {
            event.preventDefault();
        }
    });
}
