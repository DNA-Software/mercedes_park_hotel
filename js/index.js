// Variables globales
let carruselTimeout = "";
let pictures;
let cardIndex = 0;
const timeoutTime = 7; // Segundos de retraso en los timeouts

let instalaciones = [];
let instalacionesIndex = -1;
let prevIndex, nextIndex;
let totalInstalaciones = 0;
let instalacionesTiemout = '';

// LOGICA DEL CARRUSEL DEL INDEX

function mostrarCard(picture) { // Logica para mostrar la card con la clase 'active'
  const description = picture.getAttribute("data-description");

  const sources = picture.querySelectorAll("source");
  const img = picture.querySelector("img");
  const altText = img.alt;
  let imgSrc = img.src;

  sources.forEach((source) => {
    const mediaQuery = source.getAttribute("media");
    const srcset = source.getAttribute("srcset");

    if (window.matchMedia(mediaQuery).matches) {
      imgSrc = srcset;
    }
  });

  const imgCard = document.getElementById("carrusel-card-image");
  const descCard = document.getElementById("carrusel-card-description");

  imgCard.src = imgSrc;
  imgCard.alt = altText;
  descCard.innerText = description;

  if (carruselTimeout != "") {
    clearTimeout(carruselTimeout);
    carruselTimeout = "";
  }

  desplazamientoCards();
}

function desplazamientoCards() { // logica para el desplazamiento automatico del carrusel de cards principal

  carruselTimeout = setTimeout(() => {
    let nextCard = cardIndex + 1;

    if (nextCard == pictures.length)
      nextCard = 0;

    pictures[cardIndex].classList.remove("active");
    pictures[nextCard].classList.add("active");

    cardIndex = nextCard;

    mostrarCard(pictures[cardIndex]);

  }, timeoutTime * 1000);
}

function desplazamientoManual(toShowIndex){ // Handler para que no se rompa el carrusel cuando se desplaza manualmente

  clearTimeout(carruselTimeout);

  pictures[toShowIndex].classList.add("active");
  pictures[cardIndex].classList.remove("active");

  cardIndex = toShowIndex;

  mostrarCard(pictures[cardIndex]);
}

// LOGICA DEL CARRUSEL DE INSTALACIONES

function cargarDatosInstalaciones(){ // Carga los datos a mostrar en el carrusel de instalaciones
  const url = "json/instalaciones.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      instalaciones = Array.from(data.items);
      instalacionesIndex = 0;
      totalInstalaciones = data.totalRows;

      mostrarInstalaciones();
    })
    .catch((error) => console.log(error));

}

function mostrarInstalaciones(){ // Muestra los datos correspondientes a los indices activos
  const imgPrev = document.getElementById("card-instalaciones-prev").getElementsByTagName("img")[0];
  const imgCurrent = document.getElementById("card-instalaciones-current").getElementsByTagName("img")[0];
  const imgNext = document.getElementById("card-instalaciones-next").getElementsByTagName("img")[0];

  prevIndex = instalacionesIndex - 1;
  nextIndex = instalacionesIndex + 1;

  if(prevIndex == -1)
    prevIndex = totalInstalaciones - 1;

  if(nextIndex == totalInstalaciones)
    nextIndex = 0;

  imgCurrent.src = instalaciones[instalacionesIndex].src;
  imgCurrent.alt = instalaciones[instalacionesIndex].alt;
  document.getElementById("carrusel-instalaciones-description").innerText = instalaciones[instalacionesIndex].description;

  imgPrev.src = instalaciones[prevIndex].src;
  imgPrev.alt = instalaciones[prevIndex].alt;

  imgNext.src = instalaciones[nextIndex].src;
  imgNext.alt = instalaciones[nextIndex].alt;

  if(instalacionesTiemout != ''){
    clearTimeout(instalacionesTiemout);
    instalacionesTiemout = '';
  }

  desplazamientoInstalaciones();
}

function desplazamientoInstalaciones(){ // Desplazamiento automatico del carrusel de instalaciones
  instalacionesTiemout = setTimeout(() => {
    if(instalacionesIndex == totalInstalaciones - 1)
      instalacionesIndex = 0;
    else
      instalacionesIndex++;

    mostrarInstalaciones();
  }, timeoutTime * 1000);
}

function instalacionesManual(index){ // Desplazamiento manual del carrusel de instalaciones
  if(instalacionesTiemout != ''){
    clearTimeout(instalacionesTiemout);
    instalacionesTiemout = '';
  }

  instalacionesIndex = index;
  mostrarInstalaciones();
}

// Handler del formulario de contacto
function preventEvent(event, form){ // Maneja las validaciones del formulario y llama al envio del endpoint
  event.preventDefault();

  const mail = form.querySelector("input[name='mail']").value;
  const message = form.querySelector("textarea[name='message']").value;

  // VALIDACIONES
  const errors = [];
  if(mail == '' )
    errors.push("El campo mail no puede estar vacio");

  if(message == '')
    errors.push("El campo mensaje no puede estar vacio");

  // regexp para validar formularios
  const mailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if(!mailRegex.test(mail))
    errors.push("El mail ingresado no es valido");

  if(message.length < 10)
    errors.push("El mensaje debe tener al menos 10 caracteres");

  if(errors.length > 0){
    mostrarErrores(errors);
    return;
  }

  // FIN DE VALIDACIONES
  document.getElementById("form-errors-container").innerHTML = ""; // Aca depende de si queres esconder el div o solo eliminar el mensaje (ya se elimina el ul)
  sendMail(mail, message);
}

function mostrarErrores(errors){ // Muestra los errores del formulario de contacto
  const errorContainer = document.getElementById("form-errors-container");
  let html = `<ul>`;
  errors.forEach((error) => {
    html += `<li>${error}</li>`;
  })
  html += `</ul>`;
  errorContainer.innerHTML = html;
}

function sendMail(mail, message){ // Esta funcion ocupa el envio del correo
  /*const data = {
    mail : mail,
    message : message
  }

  fetch('enviar.php', {
    method: 'POST',
    body: data,
    })
    .then(response => response.text()) // Procesar la respuesta como texto
    .then(data => {
        if (data === 'success') {
          alert('¡Mensaje enviado con éxito!');
        } else {
          alert('Error al enviar el mensaje.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar el mensaje.');
    });*/
    const data = {
      service_id : 'service_18wldow', // key del servicio
      template_id : 'template_16r99uu', // key del template
      user_id : "3sDvy0Xa0JD67E4ub", // public key de la cuenta
      template_params : {
        mail : mail,
        message : message
      }
    }
  
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res =>{
        if(res.status == '200')
          alert('El correo se envio exitosamente');
        else  
          alert('Error al enviar el correo. Intente mas tarde');
      })
      .catch(err => {
        console.error(err);
        alert('Error al enviar el correo. Intente mas tarde');
      });

}

// CARGAR HANDLERS
function cargarHandlers(){
  pictures.forEach((picture) => { // Esto es para llamar al card correspondiente
    picture.addEventListener("click", () => {
      const index = Array.from(pictures).indexOf(picture);
      desplazamientoManual(index);
    });
  });

  document.getElementById("prev").addEventListener("click", () => { // Handler para cuando se toca el boton previo
    instalacionesManual(prevIndex);
  });

  document.getElementById("next").addEventListener("click", () => { // Handler para cuando se toca el boton siguiente
    instalacionesManual(nextIndex);
  });

  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e)=> preventEvent(e, form));
}

document.addEventListener("DOMContentLoaded", function () {
  pictures = document.querySelectorAll(".picture-container");

  cargarHandlers();

  mostrarCard(pictures[cardIndex]);

  cargarDatosInstalaciones();

});
