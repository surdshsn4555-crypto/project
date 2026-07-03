

// Get Elements
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("loginUsername");
const passwordInput = document.getElementById("loginPasswd");
const eyeIcon = document.getElementById("passwdEye2");

// Show/Hide Password
eyeIcon.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }
});

// Login Function
loginBtn.addEventListener("click", loginUser);

// Login when Enter key is pressed
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        loginUser();
    }
});

function loginUser() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Check empty fields
    if (username === "" || password === "") {
        alert("Please enter username and password.");
        return;
    }

    // Get registered user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No account found! Please register first.");
        window.location.href = "register.html";
        return;
    }

    // Validate credentials
    if (username === user.username && password === user.password) {

        // Save login status
        localStorage.setItem("isLoggedIn", "true");

        alert("Login Successful!");

        // Open index.html
        window.location.href = "index.html";

    } else {
        alert("Invalid Username or Password!");
    }
}