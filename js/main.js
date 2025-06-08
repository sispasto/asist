const templateCache = {};
var arrayGlobal = [];

document.addEventListener("DOMContentLoaded", async function () { 
  
  getHome();
    //google.script.run.withSuccessHandler(writeVar).readDataSheets();
  
});

async function importarTemplates(urls = []) {
  let exito = true;

  const cargar = urls.map(async (url) => {
    if (templateCache[url]) return;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error cargando ${url}`);
      const text = await res.text();

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text.trim();

      // Insertar <template> al body
      tempDiv.querySelectorAll("template").forEach(template => {
        templateCache[url] = template;
        document.body.appendChild(template);
      });

      // Ejecutar <script> internos
      tempDiv.querySelectorAll("script").forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
      });

      // Insertar <style> al <head>
      tempDiv.querySelectorAll("style").forEach(styleEl => {
        document.head.appendChild(styleEl.cloneNode(true));
      });

      // Insertar <link rel="stylesheet"> si hay
      tempDiv.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        document.head.appendChild(link.cloneNode(true));
      });

    } catch (e) {
      console.error(`Fallo al cargar ${url}:`, e);
      exito = false;
    }
  });

  await Promise.all(cargar);
  return exito;
}

function getRegistro() {
  let main = document.getElementById('App');
  removeALLChilds(main);
  const registro = document.createElement('registro-component');
  registro.setAttribute('container', '#App'); // <-- aquí pasas el parámetro
  main.appendChild(registro);
  const foto = document.createElement('foto-component');
  foto.setAttribute('container', '#App'); // <-- aquí pasas el parámetro
  main.appendChild(foto);

  /*let frmRegistro = document.getElementById('registro');
  let frmFoto = document.getElementById('foto');
  main.appendChild(frmRegistro.content.cloneNode(true));
  main.appendChild(frmFoto.content.cloneNode(true));*/

  // Ahora sí puedes buscar el botón porque ya está en el DOM
  //document.querySelector('#opencamera')?.addEventListener('click', nsModal.openCamera);  
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

function writeVar(arrayPromotors) {
  arrayGlobal = arrayPromotors.slice();
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
