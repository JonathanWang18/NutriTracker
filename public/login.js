let loginOpen = document.getElementById("openLogin")
let navLogin = document.getElementById("displayLogin")
let popup = document.getElementsByClassName("popup")[0];


function closeLogin(event) {
    event.preventDefault();
    popup.style.display = "none";
}

function openLogin(event) {
    event.preventDefault();
    popup.style.display = "block";

}

window.onclick = function (event) {
    if (event.target == document.getElementsByClassName("wrap")[0]) {
      closeLogin();
    }
}


navLogin.addEventListener('click', openLogin)
loginOpen.addEventListener('click', closeLogin)