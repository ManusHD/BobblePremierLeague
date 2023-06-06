function validar() {
    var escudoInput = document.getElementById("escudo");
    var mensajeError = document.getElementById("mensaje-error");
    var esValido = validarEnlaceGoogleDrive(escudoInput.value);
    
    if (!esValido) {
      mensajeError.innerHTML = "El enlace a Google Drive es incorrecto.";
      mensajeError.style.color = "red";
      event.preventDefault();
    }
  }
  
  function validarEnlaceGoogleDrive(enlace) {
    var esValido = false;
    var googleDriveRegex = /^https:\/\/drive\.google\.com\/.*$/;
    if (googleDriveRegex.test(enlace)) {
      esValido = true;
    }
    return esValido;
  }