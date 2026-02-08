// ===== DATABASE =====
function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(users){
    localStorage.setItem("users", JSON.stringify(users));
}

// ===== PANEL SWITCH =====
const panels = ["loginPanel","signupPanel","resetPanel","dashboard"];

function show(id){
    panels.forEach(p=>{
        document.getElementById(p).style.display = "none";
    });
    document.getElementById(id).style.display = id==="dashboard"?"flex":"flex";
}

// ===== INPUT VALIDATION =====
function validateInput(input){
    if(!input.value){
        input.classList.add("error");
        return false;
    }

    if(input.type==="email" && !input.value.endsWith("@gmail.com")){
        input.classList.add("error");
        return false;
    }

    input.classList.remove("error");
    return true;
}

// remove glow on typing
document.querySelectorAll("input").forEach(input=>{
    input.addEventListener("input",()=>input.classList.remove("error"));
});

// ===== SIGN UP =====
document.getElementById("signupForm").onsubmit = e=>{
    e.preventDefault();

    let email = su_email.value.trim();
    let pass = su_password.value.trim();

    if(!validateInput(su_email) | !validateInput(su_password)) return;

    let users = getUsers();

    if(users[email]){
        alert("Account already exists");
        return;
    }

    users[email] = pass;
    saveUsers(users);

    alert("Account created!");
    show("loginPanel");
};

// ===== LOGIN =====
document.getElementById("loginForm").onsubmit = e=>{
    e.preventDefault();

    let email = login_email.value.trim();
    let pass = login_password.value.trim();

    if(!validateInput(login_email) | !validateInput(login_password)) return;

    let users = getUsers();

    if(users[email] === pass){
        show("dashboard");
    }else{
        alert("Wrong email or password");
    }
};

// ===== RESET =====
document.getElementById("resetForm").onsubmit = e=>{
    e.preventDefault();

    let email = reset_email.value.trim();
    if(!validateInput(reset_email)) return;

    let users = getUsers();

    if(!users[email]){
        alert("Email not found");
        return;
    }

    delete users[email];
    saveUsers(users);

    alert("Email reset. Create new account.");
    show("loginPanel");
};

// ===== NAV LINKS =====
gotoSignup.onclick=()=>show("signupPanel");
gotoReset.onclick=()=>show("resetPanel");
backLogin1.onclick=()=>show("loginPanel");
backLogin2.onclick=()=>show("loginPanel");