// login code 
let loginUsername = document.querySelector("#loginUsername");
let loginPasswd = document.querySelector("#loginPasswd");
let loginBtn = document.querySelector("#loginBtn");
let passwdEye2 = document.getElementById("passwdEye2");

passwdEye2.addEventListener("click", function () {
    if (loginPasswd.type === "password") {
        loginPasswd.type = "text";
        passwdEye2.classList.remove("fa-eye-slash");
        passwdEye2.classList.add("fa-eye");
    } else {
        loginPasswd.type = "password";
        passwdEye2.classList.remove("fa-eye");
        passwdEye2.classList.add("fa-eye-slash");
    }
});

loginBtn.addEventListener("click",()=>{
    loginUsername = loginUsername.value;
    loginPasswd = loginPasswd.value;

    if (loginUsername === "" || loginPasswd === "") {
        alert("Please fill in all fields");
        return;
    }

    let oldusername = localStorage.getItem("username");
    let oldpasswd = localStorage.getItem("password");

    if (loginUsername === oldusername && loginPasswd === oldpasswd) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    }
})