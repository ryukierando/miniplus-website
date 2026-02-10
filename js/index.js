// ===== DATABASE =====
function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(users){
    localStorage.setItem("users", JSON.stringify(users));
}

// ===== PANEL SWITCH =====
const panels = ["welcomePanel", "loginPanel", "signupPanel", "resetPanel", "dashboard"];

function show(id){
    panels.forEach(p=>{
        const element = document.getElementById(p);
        if (element) {
            element.style.display = "none";
        }
    });
    
    const element = document.getElementById(id);
    if (element) {
        if (id === "dashboard") {
            element.style.display = "flex";
        } else {
            element.style.display = "flex";
        }
    }
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
        localStorage.setItem("currentUser", email);
        show("dashboard");
        loadUser();
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
// ===== WELCOME PANEL =====
yesAccountBtn.onclick = () => show("loginPanel");
noAccountBtn.onclick = () => show("signupPanel");

// ===== Notification + User panel (Dashboard)
const notifBtn = document.getElementById("notifBtn");
const profileBtn = document.getElementById("profileBtn");

const notifPanel = document.getElementById("notifPanel");
const profilePanel = document.getElementById("profilePanel");

// close all panels
function closePanels(){
    notifPanel.classList.remove("active");
    profilePanel.classList.remove("active");
}

// toggle specific panel
function togglePanel(panel){
    const isOpen = panel.classList.contains("active");
    closePanels();
    if(!isOpen) panel.classList.add("active");
}

// button clicks
notifBtn.onclick = (e)=>{
    e.stopPropagation();
    togglePanel(notifPanel);
};

profileBtn.onclick = (e)=>{
    e.stopPropagation();
    togglePanel(profilePanel);
};

// click outside closes
document.addEventListener("click", ()=>{
    closePanels();
});

// prevent panel click from closing itself
notifPanel.onclick = e=>e.stopPropagation();
profilePanel.onclick = e=>e.stopPropagation();

// user loader (dashboard)
function loadUser(){
    const email = localStorage.getItem("currentUser");
    if(!email) return;

    document.querySelector(".username").textContent = email.split("@")[0];
    document.getElementById("profileEmail").textContent = email;
}

// auto login if session exists
window.addEventListener("DOMContentLoaded", ()=>{
    const current = localStorage.getItem("currentUser");
    if(current){
        show("dashboard");
        loadUser();
    }else{
        show("loginPanel");
    }
});

// dashboard logout btn from user panel
document.getElementById("logoutBtn").onclick = ()=>{
    localStorage.removeItem("currentUser");
    show("loginPanel");
};
