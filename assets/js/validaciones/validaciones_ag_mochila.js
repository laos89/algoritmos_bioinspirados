function validarDatos() {
    // Obtener los valores de los campos
    let poblacionInput = document.getElementById("poblacion");
    let generacionesInput = document.getElementById("generaciones");
    let probCruceInput = document.getElementById("probCruce");
    let probMutacionInput = document.getElementById("probMutacion");
    let capacidadFileInput = document.getElementById("capacidadFile");
    let pesoFileInput = document.getElementById("pesoFile");
    let gananciaFileInput = document.getElementById("gananciaFile");

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
    if (poblacion <= 0 || generaciones <= 0) {
        mostrarError("La cantidad de población y generaciones debe ser un número positivo.");
        return false;
    }

    // Validar que se hayan seleccionado archivos
    if (!validarArchivo(capacidadFileInput) || !validarArchivo(pesoFileInput) || !validarArchivo(gananciaFileInput)) {
        mostrarError("Todos los campos de archivo deben contener un archivo válido.");
        return false;
    }

    // Si pasa todas las validaciones, devuelve true
    return true;
}

function obtenerDatos() {
    return new Promise((resolve, reject) => {
        var poblacion = parseInt(document.getElementById("poblacion").value);
        var generaciones = parseInt(document.getElementById("generaciones").value);
        var probCruce = parseFloat(document.getElementById("probCruce").value);
        var probMutacion = parseFloat(document.getElementById("probMutacion").value);
        let capacidadFileInput = document.getElementById("capacidadFile");
        let pesoFileInput = document.getElementById("pesoFile");
        let gananciaFileInput = document.getElementById("gananciaFile");

        // Declarar las variables fuera de las funciones onload
        let capacidad, pesos, ganancias;

        // Contador para rastrear la cantidad de archivos leídos
        let archivosLeidos = 0;

        function finalizarLectura() {
            archivosLeidos++;
            // Si todos los archivos se han leído, resolver la promesa con los datos
            if (archivosLeidos === 3) {
                resolve({
                    poblacion: poblacion,
                    generaciones: generaciones,
                    probCruce: probCruce,
                    probMutacion: probMutacion,
                    capacidad_mochila: capacidad,
                    pesos: pesos,
                    ganancias: ganancias
                });
            }
        }

        // Leer el archivo de capacidad
        let capacidadArchivo = capacidadFileInput.files[0];
        let capacidadReader = new FileReader();

        capacidadReader.onload = function (e) {
            capacidad = parseInt(e.target.result);
            console.log("Capacidad:", capacidad);
            capacidad_mochila=capacidad;
            finalizarLectura();
        };

        capacidadReader.readAsText(capacidadArchivo);

        // Leer el archivo de peso
        let pesoArchivo = pesoFileInput.files[0];
        let pesoReader = new FileReader();

        pesoReader.onload = function (e) {
            let pesoContenido = e.target.result;
            pesos = pesoContenido.split('\n').map(Number);
            console.log("Pesos:", pesos);
            pesos_individuos=pesos;
            finalizarLectura();
        };

        pesoReader.readAsText(pesoArchivo);

        // Leer el archivo de ganancia
        let gananciaArchivo = gananciaFileInput.files[0];
        let gananciaReader = new FileReader();

        gananciaReader.onload = function (e) {
            let gananciaContenido = e.target.result;
            ganancias = gananciaContenido.split('\n').map(Number);
            console.log("Ganancias:", ganancias);ganancias
            ganancias_individuos=ganancias;
            finalizarLectura();
        };

        gananciaReader.readAsText(gananciaArchivo);

        // Manejar errores
        capacidadReader.onerror = pesoReader.onerror = gananciaReader.onerror = function (error) {
            reject("Error al leer archivos: " + error.message);
        };
    });
}

function obtenerLongitudPoblacion(pesos) {
    // Obtener la longitud de datos.pesos
    return pesos.length;
}
function validarArchivo(input) {
    // Verificar que el input de tipo file no esté vacío y sea un archivo .txt
    return input.files.length > 0 && input.files[0].name.endsWith('.txt');
}


function mostrarError(mensaje) {
    // Muestra el mensaje de error en algún lugar apropiado de tu interfaz
    alert("Error: " + mensaje);
}