

// Get Elements
const regBtn = document.getElementById("regBtn");
const usernameInput = document.getElementById("regUsrename");
const passwordInput = document.getElementById("regPasswd");
const eyeIcon = document.getElementById("passwdEye");

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

// Register User
regBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validate inputs
    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Check if user already exists
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.username === username) {
        alert("Username already exists. Please choose another username.");
        return;
    }

    // Save user
    const user = {
        username: username,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    // Redirect to login page
    window.location.href = "login.html";
});

// Press Enter to Register
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        regBtn.click();
    }
});