function obtenerDatos() {
    var poblacion = parseInt(document.getElementById("poblacion").value);
    var generaciones = parseInt(document.getElementById("generaciones").value);
    var probCruce = parseFloat(document.getElementById("probCruce").value);
    var probMutacion = parseFloat(document.getElementById("probMutacion").value);

    return {
        poblacion: poblacion,
        generaciones: generaciones,
        probCruce: probCruce,
        probMutacion: probMutacion
    };
}


function generarPoblacion(cantidadDatos) {
    let poblacion = [];

    for (let i = 0; i < cantidadDatos; i++) {
        let datoBinario = Array.from({ length: 8 }, () => (Math.random() < 0.5 ? '0' : '1')).join('');
        poblacion.push(datoBinario);
        //console.log(datoBinario)
    }
    return poblacion;
}

function calcularAptitud(poblacion) {
    let sumatoriaFuncion = 0;
    let fnomAcumulado = 0;
    let datos = [];

    poblacion.forEach((dato) => {
        let numeroDecimal = parseInt(dato, 2);
        let aptitudResultante = Math.sin(Math.PI * numeroDecimal / 256);
        sumatoriaFuncion += aptitudResultante;
        datos.push([dato, numeroDecimal, aptitudResultante]);
    });

    // Calcular fnom y fnomAcumulado después de obtener sumatoriaFuncion
    datos.forEach((item, index) => {
        let aptitudRedondeada = item[2].toFixed(4);
        let fnom = (aptitudRedondeada / sumatoriaFuncion).toFixed(4) || 0;
        fnomAcumulado = (parseFloat(fnomAcumulado) + parseFloat(fnom)).toFixed(4);

        // Agregar fnom y fnomAcumulado a la matriz datos
        datos[index].push(fnom, fnomAcumulado);
    });

    // Imprimir los encabezados
    //console.log("Dato\tNúmero Decimal\tAptitud\tfnom\tfnom acumulado");

    // Imprimir cada fila de datos
    /*datos.forEach(([dato, numeroDecimal, aptitudRedondeada, fnom, fnomAcumulado]) => {
        console.log(`${dato}\t${numeroDecimal}\t${aptitudRedondeada}\t${fnom}\t${fnomAcumulado}`);
    });*/

    return datos;
}

function seleccionarPadres(poblacion) {
    //console.log(poblacion)
    let padresSeleccionados = [];
    let cantidadDatos = poblacion.length;

    for (let i = 0; i < cantidadDatos; i++) {
        let numeroAleatorio = Math.random().toFixed(4);
        let seleccionado = false;

        for (let j = 0; j < cantidadDatos; j++) {
            if (poblacion[j][4] >= numeroAleatorio) {
                //console.log("el numero aleatorio es: "+numeroAleatorio);
                //console.log("el padre seleccionado es: "+poblacion[j][0]);
                padresSeleccionados.push(poblacion[j][0]);
                seleccionado = true;
                break;
            }
        }

        if (!seleccionado) {
            // Si ningún elemento cumple la condición, selecciona el último
            padresSeleccionados.push(poblacion[cantidadDatos - 1][0]);
        }
    }

    //console.log(padresSeleccionados)
    return padresSeleccionados;
}

function cruzarPadres(padres, probabilidadCruce) {
    //console.log(padres)
    let nuevosPadres = [];
    let pc = probabilidadCruce;
    //console.log("la probabilidad de cruce es: "+probaCruce)

    for (let i = 0; i < padres.length; i += 2) {
        let numeroAleatorio = Math.random().toFixed(2);
        let padre1 = padres[i];
        let padre2 = padres[i + 1];
        //console.log("el numero aleatorio es: "+numeroAleatorio)

        if (numeroAleatorio <= pc) {
            //console.log("LOS PADRES SE VAN A CRUZAR")
            //console.log(padre1)
            //console.log(padre2)

            let indicador1 = Math.floor(Math.random() * 8);
            let indicador2 = Math.floor(Math.random() * 8);
            //console.log(indicador1)
            //console.log(indicador2)

            let padre1Segmento = padre1.split('').map(Number);
            let padre2Segmento = padre2.split('').map(Number);

            let segmento1, segmento2;

            if (indicador1 <= indicador2) {
                segmento1 = padre1Segmento.slice(indicador1, indicador2 + 1);
                segmento2 = padre2Segmento.slice(indicador1, indicador2 + 1);
            } else {
                segmento1 = padre1Segmento.slice(indicador1).concat(padre1Segmento.slice(0, indicador2 + 1));
                segmento2 = padre2Segmento.slice(indicador1).concat(padre2Segmento.slice(0, indicador2 + 1));
            }

            //console.log(segmento1)
            //console.log(segmento2)
            for (let j = 0; j < segmento1.length; j++) {
                let indiceActual = (indicador1 + j) % 8;
                padre1Segmento[indiceActual] = segmento2[j];
                padre2Segmento[indiceActual] = segmento1[j];
            }

            let nuevoPadre1 = padre1Segmento.join('');
            let nuevoPadre2 = padre2Segmento.join('');
            //console.log("e nuevo padre1 es: "+nuevoPadre1)
            //console.log("e nuevo padre2 es: "+nuevoPadre2)
            nuevosPadres.push(nuevoPadre1, nuevoPadre2);
        } else {
            nuevosPadres.push(padre1, padre2);
        }
    }
    //console.log(nuevosPadres)
    return nuevosPadres;
}

function mutarPadres(padresCruzados, probabilidadMutacion) {
    let pm = probabilidadMutacion;
    let padresMutados = [];

    padresCruzados.forEach((padre) => {
        let nuevoPadre = padre.split('');

        nuevoPadre.forEach((_, i) => {
            let numeroAleatorio = Math.random().toFixed(3);

            if (numeroAleatorio < pm) {
                //console.log("el numero aleatorio es: "+numeroAleatorio)
                //console.log("la probabilidad de mutacion es: "+probaMutacion)
                //console.log("se ha mutado al padre")
                nuevoPadre[i] = nuevoPadre[i] === '0' ? '1' : '0';
            }
        });

        padresMutados.push(nuevoPadre.join(''));
    });

    return padresMutados;
}


function mejorIndividuo(padresMutados) {
    let arreglo = padresMutados.map((dato) => {
        let numeroDecimal = parseInt(dato, 2);
        let aptitudResultante = Math.sin(Math.PI * numeroDecimal / 256);
        return [dato, numeroDecimal, aptitudResultante];
    });
    console.log(arreglo)
    let mejorElemento = arreglo.reduce((max, current) => (current[2] > max[2] ? current : max));
    return mejorElemento;
}

function mostrarResultados(resultados) {
    // Obtener la columna de resultados
    let columnaResultados = document.getElementById("resultadosColumna");

    // Limpiar la columna antes de mostrar nuevos resultados
    columnaResultados.innerHTML = "";

    // Crear elemento para mostrar el resultado
    let elementoResultado = document.createElement("p");
    elementoResultado.textContent = `La mejor solución encontrada es: ${resultados[0]} con un valor de: ${resultados[1]} y un fitness de: ${resultados[2]}`;

    // Agregar el elemento al div
    columnaResultados.appendChild(elementoResultado);
}

function algoritmoGenetico(poblacionInicial, generaciones, probabilidadCruce, probabilidadMutacion) {
    let poblacionActual = poblacionInicial;
    let mejorDeMejor = [];

    for (let i = 1; i <= generaciones; i++) {
        let poblacion = calcularAptitud(poblacionActual);
        let padres = seleccionarPadres(poblacion);
        let padresCruzados = cruzarPadres(padres, probabilidadCruce);
        let padresMutados = mutarPadres(padresCruzados, probabilidadMutacion);
        let mejorIndividuoGeneracion = mejorIndividuo(padresMutados);

        poblacionActual = padresMutados;

        console.log(`El mejor individuo de la generación ${i} es: ${mejorIndividuoGeneracion[0]} con un valor de: ${mejorIndividuoGeneracion[1]} con un fitness de: ${mejorIndividuoGeneracion[2]}`);
        mejorDeMejor.push(mejorIndividuoGeneracion);
    }

    let solucion = mejorDeMejor.reduce((max, current) => (current[2] > max[2] ? current : max));
    console.log("La mejor solución encontrada es: " + solucion[0] + " con un valor de: " + solucion[1] + " y un fitness de: " + solucion[2]);
    // Mostrar resultados en la columna correspondiente
    mostrarResultados(solucion);
}

function ejecutarAlgoritmoGenetico() {
    if (!validarDatos()) {
        return;
    }
    // Obtener datos desde la interfaz
    var datos = obtenerDatos();

    // Ejecutar algoritmo genético con los datos obtenidos
    let poblacionInicial = generarPoblacion(datos.poblacion);
    algoritmoGenetico(poblacionInicial, datos.generaciones, datos.probCruce, datos.probMutacion);
}

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


document.getElementById("btnEjecutar").addEventListener("click", ejecutarAlgoritmoGenetico);

// Ejecucion de funciones
/*let cantidadPoblacion = 20; // Cantidad de población
let cantidadGeneraciones = 10; // Cantidad de generaciones
let probaCruce = 0.65; // Probabilidad de cruce
let probaMutacion = 0.001; // Probabilidad de mutación

let poblacionInicial = generarPoblacion(cantidadPoblacion);
algoritmoGenetico(poblacionInicial, cantidadGeneraciones, probaCruce, probaMutacion);*/

