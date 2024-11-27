const nav = document.querySelector("nav");
const navToggle = document.querySelector("button");

navToggle.addEventListener("click", () => { // Handler para cuando se toca el boton de navegacion
  nav.classList.toggle("open")
});