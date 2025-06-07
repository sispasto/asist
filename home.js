<script>
      var arrayGlobal=[];//arreglo de promotores

      document.addEventListener("DOMContentLoaded",function(){
        let main = document.getElementById('App');
        let frmBienvenida = document.getElementById('bienvenida'); 
        main.appendChild(frmBienvenida.content.cloneNode(true));
        google.script.run.withSuccessHandler(writeVar).readDataSheets(); //writeVar se ejecuta despues de readDataSheets
      });

      function getRegistro(){            
        let main = document.getElementById('App'); removeALLChilds( main );
        let frmRegistro = document.getElementById('registro');                
        let frmFoto = document.getElementById('foto');
        main.appendChild(frmRegistro.content.cloneNode(true));        
        main.appendChild(frmFoto.content.cloneNode(true));
      }
      function getHome(){
        let main = document.getElementById('App'); removeALLChilds( main );
        let frmBienvenida = document.getElementById('bienvenida'); 
        main.appendChild(frmBienvenida.content.cloneNode(true)); 
      }

      function errorUpload(data){
          alert("Error al generar el archivo");
      }

      function removeALLChilds( parentNode ){
        while (parentNode.firstChild) {
          parentNode.removeChild(parentNode.firstChild);
        }
      }

      function alertSMS( texto ){//Para imprimir 
        let myToast = document.querySelector('.toast');
        let smsToast = document.querySelector('.toast-body');
        let toast = new bootstrap.Toast(myToast);
        smsToast.innerHTML = texto;          
        toast.show();        
      }     

      function getInforme(){
         let main = document.getElementById('App'); removeALLChilds( main );
         let frmInformes = document.getElementById('informe');
         let frmvmodal = document.getElementById('vmodal');
         main.appendChild(frmvmodal.content.cloneNode(true));
         main.appendChild(frmInformes.content.cloneNode(true));   
         let listames = document.getElementById('listames');
         let listayear = document.getElementById('listyear');
         fechaActual = new Date();
         let year = fechaActual.getFullYear();
         let mes = fechaActual.getMonth()+1;
         listames.value= mes; listayear.value= year;          
      }      

      function getNomina(){
         let main = document.getElementById('App'); removeALLChilds( main );
         let frmInformes = document.getElementById('nomina');
         let frmvmodal = document.getElementById('vmodal');
         main.appendChild(frmvmodal.content.cloneNode(true));
         main.appendChild(frmInformes.content.cloneNode(true)) 
      }
      
      function writeVar( arrayPromotors ){
        arrayGlobal = arrayPromotors.slice();//se asigna el array devuelto por readDataSheets a la variable arrayGlobal     
      }

      function crearLoader(){ 
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
          document.body.appendChild(containerloader); // en lugar de #App para cubrir toda la ventana
      }

      function eliminarLoader(){
        let loader = document.getElementById('containerloader');
        if(loader) loader.remove();
      }
    
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
  </script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous">
</script> 
<script>
  const navLinks = document.querySelectorAll('.nav-item');
  const menuToggle = document.getElementById('navbarText');
  const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});

  navLinks.forEach((l) => {
    l.addEventListener('click', () => { bsCollapse.toggle() });
  });
</script>
<!-- CDN de Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>