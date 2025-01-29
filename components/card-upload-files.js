class CardUploadFiles extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <section class="draw-and-drop">
        <div class="central-container">
          <h2 class="central-title">Haga clic aquí</h2>

          <p>Adjunte el siguiente archivo</p>
          <div class="central-draw-and-drop">
            <img
              src="./assets/img/image-upload-files.png"
              alt="Imagen decorativa del contenedor de arrastrar y soltar"
            />
            <div class="text-container">
              <p class="dragText">Arrastre los archivos aquí para cargarlos</p>
              <p>También puede seleccionar un archivo mediante:</p>
              <p class="click-archiver"><strong>Haga clic aquí</strong></p>
            </div>
            <input type="file" id="input-file" accept="image" title="Selecciona cualquier imagen">
          </div>
          <div class="central-buttons">
            <button>Cancelar</button>
            <button>Subir Archivos</button>
          </div>
          </div>
          <img class="imgPreview" id="imgPreview" alt="Vista previa de la imagen"/>
      </section>
        `;
  }
}

window.customElements.define("card-upload-files", CardUploadFiles);