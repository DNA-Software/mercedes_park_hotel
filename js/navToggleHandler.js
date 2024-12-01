const nav = document.querySelector("nav");
const navToggle = document.querySelector("button");
const header = document.querySelector("header");

navToggle.addEventListener("click", () => { // Handler para cuando se toca el boton de navegacion
  nav.classList.toggle("open")
});

window.addEventListener('scroll', () => { // Event listener para el scroll de la pagina
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});