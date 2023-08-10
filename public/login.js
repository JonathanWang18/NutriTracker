var loginOpen = document.getElementById("openLogin")
var navLogin = document.getElementById("displayLogin")
var popup = document.getElementsByClassName("popup")[0];


function closeLogin(event) {
    event.preventDefault();
    popup.style.display = "none";
}

function openLogin(event) {
    event.preventDefault();
    popup.style.display = "block";

}

window.onclick = function (event) {
    console.log("Click Works\n")
    if (event.target == document.getElementsByClassName("wrap")[0]) {
      closeLogin();
    }
}


navLogin.addEventListener('click', openLogin)
loginOpen.addEventListener('click', closeLogin)