let capacidad_mochila = 0;
let pesos_individuos = 0;
let ganancias_individuos = 0;

function generarPoblacion(cantidadDatos,longitud) {
    let poblacion = [];

    for (let i = 0; i < cantidadDatos; i++) {
        let datoBinario = Array.from({ length: longitud }, () => (Math.random() < 0.5 ? '0' : '1')).join('');
        poblacion.push(datoBinario);
    }
    console.log(poblacion)
    return poblacion;
}

function calcularAptitud(poblacion) {
    let sumatoriaFuncion = 0;
    let fnomAcumulado = 0;
    let datos = [];

    poblacion.forEach((dato) => {
        peso = 0;
        aptitudResultante=0;
        for (let i = 0; i < dato.length; i++) {
            peso += parseInt(dato[i]) * pesos_individuos[i];
        }
        
        if (peso <=capacidad_mochila){
            for (let i = 0; i < dato.length; i++) {
                aptitudResultante += parseInt(dato[i]) * ganancias_individuos[i];
            }
        }else{
        }
        sumatoriaFuncion += aptitudResultante;
        datos.push([dato, aptitudResultante]);
    });

    // Calcular fnom y fnomAcumulado después de obtener sumatoriaFuncion
    datos.forEach((item, index) => {
        let aptitudRedondeada = item[1].toFixed(4);
        let fnom = (aptitudRedondeada / sumatoriaFuncion).toFixed(4) || 0;
        fnomAcumulado = (parseFloat(fnomAcumulado) + parseFloat(fnom)).toFixed(4);

        // Agregar fnom y fnomAcumulado a la matriz datos
        datos[index].push(fnom, fnomAcumulado);
    });

    // Imprimir los encabezados
    //console.log("Dato\tAptitud\tfnom\tfnom acumulado");

    // Imprimir cada fila de datos
    /*datos.forEach(([dato, aptitudRedondeada, fnom, fnomAcumulado]) => {
        console.log(`${dato}\t${aptitudRedondeada}\t${fnom}\t${fnomAcumulado}`);
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
            if (poblacion[j][3] >= numeroAleatorio) {
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
    let mejorElemento = padresMutados.reduce((max, current) => {
        let peso = 0;
        let aptitudResultante = 0;

        for (let i = 0; i < current.length; i++) {
            peso += parseInt(current[i]) * pesos_individuos[i];
        }

        if (peso <= capacidad_mochila) {
            for (let i = 0; i < current.length; i++) {
                aptitudResultante += parseInt(current[i]) * ganancias_individuos[i];
            }
        }

        return aptitudResultante > max[1] ? [current, aptitudResultante, peso] : max;
    }, ['', 0]);

    return mejorElemento;
}

function mostrarResultados(resultados) {
    // Obtener la columna de resultados
    let columnaResultados = document.getElementById("resultadosColumna");

    // Limpiar la columna antes de mostrar nuevos resultados
    columnaResultados.innerHTML = "";

    // Crear elemento para mostrar el resultado
    let elementoResultado = document.createElement("p");
    elementoResultado.textContent = `La mejor solución encontrada es: ${resultados[0]} con una ganancia de: ${resultados[1]} y un peso de: ${resultados[2]}`;

    // Agregar el elemento al div
    columnaResultados.appendChild(elementoResultado);

    // Recorrer el string resultados[0] y mostrar mensajes según los elementos
    for (let i = 0; i < resultados[0].length; i++) {
        if (resultados[0][i] === '1') {
            let mensajeElemento = document.createElement("p");
            mensajeElemento.textContent = `Tienes que llevar el elemento: ${i + 1}`;
            mensajeElemento.style.margin = "0";  // Ajustar el margen
            columnaResultados.appendChild(mensajeElemento);
        }
    }
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

        //console.log(`El mejor individuo de la generación ${i} es: ${mejorIndividuoGeneracion[0]} con una ganancia de: ${mejorIndividuoGeneracion[1]} con un peso de: ${mejorIndividuoGeneracion[2]}`);
        mejorDeMejor.push(mejorIndividuoGeneracion);
    }

    let solucion = mejorDeMejor.reduce((max, current) => (current[1] > max[1] ? current : max));
    console.log("La mejor solución encontrada es: " + solucion[0] + " con una ganancia de: " + solucion[1] + " y un peso de: " + solucion[2]);
    // Mostrar resultados en la columna correspondiente
    mostrarResultados(solucion);
}

async function ejecutarAlgoritmoGenetico() {
    try {
        if (!await validarDatos()) {
            return;
        }
        // Obtener datos desde la interfaz
        var datos = await obtenerDatos();

        // Obtener la longitud de datos.pesos y pasarla a generarPoblacion
        let longitudPoblacion = obtenerLongitudPoblacion(datos.pesos);

        // Ejecutar algoritmo genético con los datos obtenidos y la capacidad como parámetro
        let poblacionInicial = generarPoblacion(datos.poblacion, longitudPoblacion);
        algoritmoGenetico(poblacionInicial, datos.generaciones, datos.probCruce, datos.probMutacion);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("btnEjecutar").addEventListener("click", ejecutarAlgoritmoGenetico);