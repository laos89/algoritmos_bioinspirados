function validarDatos() {
    // Obtener los valores de los campos
    let poblacionInput = document.getElementById("poblacion");
    let generacionesInput = document.getElementById("generaciones");
    let capacidadFileInput = document.getElementById("capacidadFile");
    let pesoFileInput = document.getElementById("pesoFile");
    let gananciaFileInput = document.getElementById("gananciaFile");

    let poblacion = parseInt(poblacionInput.value);
    let generaciones = parseInt(generacionesInput.value);

    // Validar que ningún campo esté vacío
    if (!poblacionInput.value) {
        mostrarError("Todos los campos deben ser completados acorde a las indicaciones.");
        return false;
    }

    // Validar que los campos contengan solo números
    if (isNaN(poblacion) || isNaN(generaciones)) {
        mostrarError("Todos los campos deben contener solo números.");
        return false;
    }

    // Validar que generaciones sea un número positivo
    if (poblacion <= 0 || generaciones <= 0) {
        mostrarError("La cantidad de población y la condiciónn de paro debe ser un número positivo.");
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

function validarArchivo(input) {
    // Verificar que el input de tipo file no esté vacío y sea un archivo .txt
    return input.files.length > 0 && input.files[0].name.endsWith('.txt');
}

function mostrarError(mensaje) {
    // Muestra el mensaje de error en algún lugar apropiado de tu interfaz
    alert("Error: " + mensaje);
}

function obtenerDatos() {
    return new Promise((resolve, reject) => {
        var poblacion = parseInt(document.getElementById("poblacion").value);
        var generaciones = parseInt(document.getElementById("generaciones").value);
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
            //console.log("Capacidad:", capacidad);
            capacidad_mochila = capacidad;
            finalizarLectura();
        };

        capacidadReader.readAsText(capacidadArchivo);

        // Leer el archivo de peso
        let pesoArchivo = pesoFileInput.files[0];
        let pesoReader = new FileReader();

        pesoReader.onload = function (e) {
            let pesoContenido = e.target.result;
            pesos = pesoContenido.split('\n').map(Number);
            //console.log("Pesos:", pesos);
            pesos_individuos = pesos;
            finalizarLectura();
        };

        pesoReader.readAsText(pesoArchivo);

        // Leer el archivo de ganancia
        let gananciaArchivo = gananciaFileInput.files[0];
        let gananciaReader = new FileReader();

        gananciaReader.onload = function (e) {
            let gananciaContenido = e.target.result;
            ganancias = gananciaContenido.split('\n').map(Number);
            //console.log("Ganancias:", ganancias);ganancias
            ganancias_individuos = ganancias;
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


function calcularResultado(particula) {
    let peso = 0;
    let ganancia = 0;

    for (let i = 0; i < particula.length; i++) {
        peso += parseInt(particula[i]) * pesos_individuos[i];
    }

    if (peso <= capacidad_mochila) {
        for (let i = 0; i < particula.length; i++) {
            ganancia += parseInt(particula[i]) * ganancias_individuos[i];
        }
    }

    return [particula, ganancia, peso];
}

function mostrarResultados(resultado) {
    resultados = calcularResultado(resultado);

    // Obtener la columna de resultados
    let columnaResultados = document.getElementById("resultadosColumna");

    // Limpiar la columna antes de mostrar nuevos resultados
    columnaResultados.innerHTML = "";

    // Crear elemento para mostrar el resultado
    let elementoResultado = document.createElement("p");
    elementoResultado.textContent = `La mejor solución encontrada es: ${resultados[0]} con una ganancia de: ${resultados[1]} y un peso de: ${resultados[2]}`;

    // Agregar el elemento al div
    columnaResultados.appendChild(elementoResultado);

    // Recorrer el array de elementos (resultados[0]) y mostrar mensajes según los elementos
    for (let i = 0; i < resultados[0].length; i++) {
        if (resultados[0][i] === 1) { // Modificado de '1' a 1
            let mensajeElemento = document.createElement("p");
            mensajeElemento.textContent = `Tienes que llevar el elemento: ${i + 1}`;
            mensajeElemento.style.margin = "0";  // Ajustar el margen
            columnaResultados.appendChild(mensajeElemento);
        }
    }
}
