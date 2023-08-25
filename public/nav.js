const nav = document.querySelector(".nav");
const navbarCollapser = document.querySelector(".nav__collapser");

navbarCollapser.onclick = () => {
	nav.classList.toggle("nav--expanded");
};
