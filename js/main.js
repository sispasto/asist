const templateCache = {};
var arrayGlobal = [];
const API_URL = "https://script.google.com/a/macros/envia.co/s/AKfycbxYk37eyW65emvTSs2hYuEg_Xo8s5UORfbVf6Wc0wxS9tqRw6nvM8RN19deuihIpbYO/exec";

document.addEventListener("DOMContentLoaded", async function () {   
  getHome();
});

function getRegistro() {
  let main = document.getElementById('App');
  removeALLChilds(main);
  const registro = document.createElement('registro-component');
  registro.setAttribute('container', '#App'); // <-- aquí pasas el parámetro
  main.appendChild(registro);
  const foto = document.createElement('foto-component');
  foto.setAttribute('container', '#App'); // <-- aquí pasas el parámetro
  main.appendChild(foto); 
}

function getHome() {
  let main = document.getElementById('App');
  removeALLChilds(main);

  const componente = document.createElement('bienvenida-component');
  componente.setAttribute('container', '#App'); // <-- aquí pasas el parámetro
  main.appendChild(componente);
}


function errorUpload(data) {
  alert("Error al generar el archivo");
}

function removeALLChilds(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

function alertSMS(texto) {
  let myToast = document.querySelector('.toast');
  let smsToast = document.querySelector('.toast-body');
  let toast = new bootstrap.Toast(myToast);
  smsToast.innerHTML = texto;
  toast.show();
}

function getInforme() {
  let main = document.getElementById('App');
  removeALLChilds(main);
  let frmInformes = document.getElementById('informe');
  let frmvmodal = document.getElementById('vmodal');
  main.appendChild(frmvmodal.content.cloneNode(true));
  main.appendChild(frmInformes.content.cloneNode(true));
  let listames = document.getElementById('listames');
  let listayear = document.getElementById('listyear');
  let fechaActual = new Date();
  let year = fechaActual.getFullYear();
  let mes = fechaActual.getMonth() + 1;
  listames.value = mes;
  listayear.value = year;
}

function getNomina() {
  let main = document.getElementById('App');
  removeALLChilds(main);
  let frmInformes = document.getElementById('nomina');
  let frmvmodal = document.getElementById('vmodal');
  main.appendChild(frmvmodal.content.cloneNode(true));
  main.appendChild(frmInformes.content.cloneNode(true));
}

async function getArrayPromotors() {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({ action: 'getPromotors' })
    });

    const data = await response.json();

    if (data.status === 'success') {
      arrayGlobal = data.data;
    } else {
      //alertSMS(data.mensaje || "Error al obtener promotores");
      console.log( data.mensaje );
    }
  } catch (error) {
    console.error('Error:', error);
    //alertSMS("Error en la conexión");
  }
}

function crearLoader() {
  eliminarLoader();
  let containerloader = document.createElement('div');
  containerloader.id = "containerloader";
  let loader = document.createElement('div');
  loader.id = "loader";
  for (let i = 0; i < 4; i++) {
    loader.appendChild(document.createElement('div'));
  }
  loader.classList.add('lds-roller');
  containerloader.appendChild(loader);
  document.body.appendChild(containerloader);
}

function eliminarLoader() {
  let loader = document.getElementById('containerloader');
  if (loader) loader.remove();
}

// Este código también puede ir en el archivo .js si no requiere esperar a que HTML cargue
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-item');
  const menuToggle = document.getElementById('navbarText');
  const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

  navLinks.forEach((l) => {
    l.addEventListener('click', () => {
      bsCollapse.toggle();
    });
  });
});
