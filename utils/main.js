// Selección de elementos del DOM
const clickArchiver = document.querySelector(".click-archiver"); // Botón para abrir el selector de archivos
const input = document.querySelector("#input-file"); // Input oculto de tipo file
const containerDrag = document.querySelector(".central-draw-and-drop"); // Contenedor de arrastrar y soltar
const dragText = document.querySelector(".dragText"); // Texto dentro del área de arrastrar y soltar
const imagePreviewContainer = document.querySelector("#image-preview-container"); // Contenedor para la vista previa de las imágenes

// Evento para abrir el selector de archivos cuando se hace clic en el botón
clickArchiver.addEventListener("click", () => {
  input.click();
});

// Evento cuando un archivo se arrastra sobre el área de drop
containerDrag.addEventListener("dragover", (e) => {
  e.preventDefault(); // Previene el comportamiento por defecto del navegador
  containerDrag.classList.add("active"); // Agrega una clase para indicar estado activo
  dragText.textContent = "Suelta para subir la imagen"; // Cambia el texto de la UI
});

// Evento cuando el archivo sale del área de drop sin soltarse
containerDrag.addEventListener("dragleave", (e) => {
  e.preventDefault();
  containerDrag.classList.remove("active"); // Quita la clase activa
  dragText.textContent = "Arrastra y suelta la imagen"; // Restaura el texto original
});

// Evento cuando el archivo se suelta en el área de drop
containerDrag.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files; // Obtiene los archivos arrastrados
  if (files.length + imagePreviewContainer.children.length > 5) {
    alert("No puedes subir más de 5 imágenes.");
    return;
  }
  leerArchivos(files); // Procesa los archivos
  containerDrag.classList.remove("active"); // Quita la clase activa
  dragText.textContent = "Arrastra y suelta la imagen"; // Restaura el texto original
});

// Evento cuando el usuario selecciona un archivo desde el input
input.addEventListener("change", (e) => {
  const files = e.target.files; // Obtiene los archivos seleccionados
  if (files.length + imagePreviewContainer.children.length > 5) {
    alert("No puedes subir más de 5 imágenes.");
    return;
  }
  leerArchivos(files); // Procesa los archivos
});

/**
 * Función para leer y procesar las imágenes seleccionadas o arrastradas.
 * @param {FileList} files - Lista de archivos seleccionados.
 */
function leerArchivos(files) {
  const formatosValidos = ["image/jpeg", "image/png", "image/gif"]; // Tipos de imágenes permitidos

  Array.from(files).forEach(file => {
    if (formatosValidos.includes(file.type)) {
      const fileReader = new FileReader(); // Instancia un lector de archivos

      fileReader.addEventListener("load", (e) => {
        const fileResult = e.target.result; // Contenido del archivo en formato Base64

        // Crear un elemento img para mostrar la imagen cargada
        const imgPreview = document.createElement('img');
        imgPreview.src = fileResult;
        imgPreview.style.maxWidth = "200px"; // Ajusta el tamaño de la imagen
        imgPreview.style.margin = "10px"; // Añade un margen entre las imágenes

        // Añadir la imagen al contenedor de vista previa
        imagePreviewContainer.appendChild(imgPreview);

        // Guardar la imagen en localStorage
        let imagenesGuardadas = JSON.parse(localStorage.getItem("imagenes")) || [];
        imagenesGuardadas.push(fileResult);
        localStorage.setItem("imagenes", JSON.stringify(imagenesGuardadas));
      });

      fileReader.readAsDataURL(file); // Leer el archivo como Base64
    } else {
      alert("Solo se permiten archivos de imagen (JPEG, PNG, GIF)"); // Alerta si el archivo no es una imagen válida
    }
  });
}