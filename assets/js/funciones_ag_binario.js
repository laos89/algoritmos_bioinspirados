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
    let padresSeleccionados = [];
    let cantidadDatos = poblacion.length;

    for (let i = 0; i < cantidadDatos; i++) {
        let numeroAleatorio = Math.random().toFixed(4);
        let seleccionado = false;

        for (let j = 0; j < cantidadDatos; j++) {
            if (poblacion[j][4] >= numeroAleatorio) {
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
    return padresSeleccionados;
}

function cruzarPadres(padres, probabilidadCruce) {
    let nuevosPadres = [];
    let pc = probabilidadCruce;

    for (let i = 0; i < padres.length; i += 2) {
        let numeroAleatorio = Math.random().toFixed(2);
        let padre1 = padres[i];
        let padre2 = padres[i + 1];

        if (numeroAleatorio <= pc) {
            let indicador1 = Math.floor(Math.random() * 8);
            let indicador2 = Math.floor(Math.random() * 8);

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

            for (let j = 0; j < segmento1.length; j++) {
                let indiceActual = (indicador1 + j) % 8;
                padre1Segmento[indiceActual] = segmento2[j];
                padre2Segmento[indiceActual] = segmento1[j];
            }

            let nuevoPadre1 = padre1Segmento.join('');
            let nuevoPadre2 = padre2Segmento.join('');
            nuevosPadres.push(nuevoPadre1, nuevoPadre2);
        } else {
            nuevosPadres.push(padre1, padre2);
        }
    }
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

        //console.log(`El mejor individuo de la generación ${i} es: ${mejorIndividuoGeneracion[0]} con un valor de: ${mejorIndividuoGeneracion[1]} con un fitness de: ${mejorIndividuoGeneracion[2]}`);
        mejorDeMejor.push(mejorIndividuoGeneracion);
    }

    let solucion = mejorDeMejor.reduce((max, current) => (current[2] > max[2] ? current : max));
    //console.log("La mejor solución encontrada es: " + solucion[0] + " con un valor de: " + solucion[1] + " y un fitness de: " + solucion[2]);
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

document.getElementById("btnEjecutar").addEventListener("click", ejecutarAlgoritmoGenetico);