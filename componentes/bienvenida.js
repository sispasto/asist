class BienvenidaComponent extends HTMLElement {
  constructor() {
    super();
    //this.attachShadow({ mode: 'open' }); Encapsula todo independiente todo css y js por eso lo comente
  }

  async connectedCallback() {
    const containerSelector = this.getAttribute('container'); //|| '#App';
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
      return;
    }

    try {
      const response = await fetch('view/bienvenida.html');
      const htmlText = await response.text();

      // Crear un template para manipular el contenido
      const template = document.createElement('template');
      template.innerHTML = htmlText;

      // Extraer scripts
      const scripts = template.content.querySelectorAll('script');
      scripts.forEach(script => script.remove()); // Remover antes de clonar

      // Insertar el contenido HTML en el shadow DOM
      //this.shadowRoot.appendChild(template.content.cloneNode(true));Encapsula todo independiente todo css y js por eso lo comente
      this.innerHTML = '';
      this.appendChild(template.content.cloneNode(true));

      // Limpiar scripts anteriores en el contenedor
      container.querySelectorAll('script[data-dynamic="true"]').forEach(s => s.remove());

      // Insertar los scripts dinámicamente en el contenedor
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        newScript.setAttribute('data-dynamic', 'true'); // para poder eliminarlos luego
        container.appendChild(newScript);
      });

    } catch (error) {
      console.error('Error al cargar bienvenida.html:', error);
    }
  }
}

customElements.define('bienvenida-component', BienvenidaComponent);
