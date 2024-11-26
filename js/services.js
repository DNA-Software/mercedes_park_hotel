const timeoutTime = 7; // Segundos de retraso en los timeouts


let comun, comunIndex, comunTotal, room, roomIndex, roomTotal, garage, garageIndex, garageTotal;

let commonTimeout = '';
let roomTimeout = '';
let garageTimeout = '';


function mostrarComun(){
  const imgTag = document.getElementById('comun-carrusel-container').getElementsByTagName('img')[0];
  const dotsArray = Array.from(document.getElementById('comun-carrusel-container').getElementsByClassName('carrusel-buttons'));

  for(let i = 0; i < comunTotal; i++){
    if(i == comunIndex)
      dotsArray[i].classList.add('active-button');
    else
      dotsArray[i].classList.remove('active-button');
  }

  imgTag.src = comun[comunIndex].src;
  imgTag.alt = comun[comunIndex].alt;

  if(commonTimeout != ''){
    clearTimeout(commonTimeout);
    commonTimeout = '';
  }

  desplazamientoCommon();
}

function desplazamientoCommon(){
  commonTimeout = setTimeout(() => {
    if(comunIndex == comunTotal - 1)
      comunIndex = 0;
    else
      comunIndex++;

      mostrarComun();
  }, timeoutTime * 1000);
}

function commonMove(index){
  if(commonTimeout != ''){
    clearTimeout(commonTimeout);
    commonTimeout = '';
  }

  comunIndex = index;
  mostrarComun();
}

function mostrarRoom(){
  const imgTag = document.getElementById('room-carrusel-container').getElementsByTagName('img')[0];
  const dotsArray = Array.from(document.getElementById('room-carrusel-container').getElementsByClassName('carrusel-buttons'));

  for(let i = 0; i < roomTotal; i++){
    if(i == roomIndex)
      dotsArray[i].classList.add('active-button');
    else
      dotsArray[i].classList.remove('active-button');
  }

  imgTag.src = room[roomIndex].src;
  imgTag.alt = room[roomIndex].alt;

  if(roomTimeout != ''){
    clearTimeout(roomTimeout);
    roomTimeout = '';
  }

  desplazamientoRoom();
}

function roomMove(index){
  if(roomTimeout != ''){
    clearTimeout(roomTimeout);
    roomTimeout = '';
  }

  roomIndex = index;
  mostrarRoom();
}

function desplazamientoRoom(){
  roomTimeout = setTimeout(() => {
    if(roomIndex == roomTotal - 1)
      roomIndex = 0;
    else
      roomIndex++;

    mostrarRoom();

  }, timeoutTime * 1000);
}

function mostrarGarage(){
  const imgTag = document.getElementById('garage-carrusel-container').getElementsByTagName('img')[0];
  const dotsArray = Array.from(document.getElementById('garage-carrusel-container').getElementsByClassName('carrusel-buttons'));

  for(let i = 0; i < garageTotal; i++){
    if(i == garageIndex)
      dotsArray[i].classList.add('active-button');
    else
      dotsArray[i].classList.remove('active-button');
  }

  imgTag.src = garage[garageIndex].src;
  imgTag.alt = garage[garageIndex].alt;

  if(garageTimeout != ''){
    clearTimeout(garageTimeout);
    garageTimeout = '';
  }

  desplazamientoGarage();
}

function garageMove(index){
  if(garageTimeout != ''){
    clearTimeout(garageTimeout);
    garageTimeout = '';
  }

  garageIndex = index;
  mostrarGarage();
}

function desplazamientoGarage(){
  garageTimeout = setTimeout(() => {
    if(garageIndex == garageIndex - 1)
      garageIndex = 0;
    else
      garageIndex++;

    mostrarGarage();

  }, timeoutTime * 1000);
}


function cargarHandlers(){
  let url = "json/services-comun.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      comun = Array.from(data.items);
      comunIndex = 0;
      comunTotal = data.totalRows;

      const container = document.getElementById("comun-carrusel-buttons");

      for(let i = 0; i < comunTotal; i++){
        container.innerHTML += `<span class='carrusel-buttons' onclick='commonMove(${i})'></span>`;
      }

      mostrarComun();
    })
    .catch((error) => console.log(error));


  url = "json/services-room.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      room = Array.from(data.items);
      roomIndex = 0;
      roomTotal = data.totalRows;

      const container = document.getElementById("room-carrusel-buttons");

      for(let i = 0; i < roomTotal; i++){
        container.innerHTML += `<span class='carrusel-buttons' onclick='roomMove(${i})'></span>`;
      }

      mostrarRoom();
    })
    .catch((error) => console.log(error));

  url = "json/services-garage.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      garage = Array.from(data.items);
      garageIndex = 0;
      garageTotal = data.totalRows;
  
      const container = document.getElementById("garage-carrusel-buttons");

      for(let i = 0; i < garageTotal; i++){
        container.innerHTML += `<span class='carrusel-buttons' onclick='garageMove(${i})'></span>`;
      }

      mostrarGarage();
     })
     .catch((error) => console.log(error));
}


document.addEventListener("DOMContentLoaded", function () {
  cargarHandlers();
  
  // mostrarCard(pictures[cardIndex]);

  // cargarDatosInstalaciones();

});
