function validarDatos() {
    // Obtener los valores de los campos
    let poblacionInput = document.getElementById("poblacion");
    let generacionesInput = document.getElementById("generaciones");
    let probCruceInput = document.getElementById("probCruce");
    let probMutacionInput = document.getElementById("probMutacion");

    let poblacion = parseInt(poblacionInput.value);
    let generaciones = parseInt(generacionesInput.value);
    let probCruce = parseFloat(probCruceInput.value);
    let probMutacion = parseFloat(probMutacionInput.value);

    // Validar que ningún campo esté vacío
    if (!poblacionInput.value || !generacionesInput.value || !probCruceInput.value || !probMutacionInput.value) {
        mostrarError("Todos los campos deben ser completados acorde a las indicaciones.");
        return false;
    }

    // Validar que los campos contengan solo números
    if (isNaN(poblacion) || isNaN(generaciones) || isNaN(probCruce) || isNaN(probMutacion)) {
        mostrarError("Todos los campos deben contener solo números.");
        return false;
    }

    // Validar que población sea un número par
    if (poblacion % 2 !== 0) {
        mostrarError("La cantidad de población debe ser un número par.");
        return false;
    }

    // Validar que probabilidad de cruce esté en el rango correcto
    if (probCruce <= 0 || probCruce >= 1) {
        mostrarError("La probabilidad de cruce debe ser un decimal entre 0 y 1.");
        return false;
    }

    // Validar que probabilidad de mutación esté en el rango correcto
    if (probMutacion <= 0 || probMutacion >= 1) {
        mostrarError("La probabilidad de mutación debe ser un decimal entre 0 y 1");
        return false;
    }

    // Validar que generaciones sea un número positivo
    if (generaciones <= 0) {
        mostrarError("La cantidad de generaciones debe ser un número positivo.");
        return false;
    }

    // Si pasa todas las validaciones, devuelve true
    return true;
}


function mostrarError(mensaje) {
    // Muestra el mensaje de error en algún lugar apropiado de tu interfaz
    alert("Error: " + mensaje);
}