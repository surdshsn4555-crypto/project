// register code
let regUsername = document.querySelector("#regUsrename");
let regPasswd = document.querySelector("#regPasswd");
let regBtn = document.querySelector("#regBtn");
let passwdEye = document.querySelector("#passwdEye");

passwdEye.addEventListener("click", function () {
    if (regPasswd.type === "password") {
        regPasswd.type = "text";
        passwdEye.classList.remove("fa-eye-slash");
        passwdEye.classList.add("fa-eye");
    } else {
        regPasswd.type = "password";
        passwdEye.classList.remove("fa-eye");
        passwdEye.classList.add("fa-eye-slash");
    }
});

regBtn.addEventListener("click", function () {
    regUsername = regUsername.value;
    regPasswd = regPasswd.value;

    if (regUsername === "" || regPasswd === "") {
        alert("Please fill in all fields");
        return;
    }

    localStorage.setItem("username", regUsername);
    localStorage.setItem("password", regPasswd);
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "index.html";
});