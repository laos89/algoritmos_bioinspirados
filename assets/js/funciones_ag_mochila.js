let capacidad_mochila = 0;
let pesos_individuos = 0;
let ganancias_individuos = 0;

function generarPoblacion(cantidadDatos,longitud) {
    let poblacion = [];

    for (let i = 0; i < cantidadDatos; i++) {
        let datoBinario = Array.from({ length: longitud }, () => (Math.random() < 0.5 ? '0' : '1')).join('');
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
        peso = 0;
        aptitudResultante=0;
        for (let i = 0; i < dato.length; i++) {
            peso += parseInt(dato[i]) * pesos_individuos[i];
        }
        //console.log("el peso del individuo es: "+ peso);
        //console.log("la capacidad es de:  "+ capacidad_mochila);
        
        if (peso <=capacidad_mochila){
            for (let i = 0; i < dato.length; i++) {
                aptitudResultante += parseInt(dato[i]) * ganancias_individuos[i];
            }
            //console.log("la aptitud del individuo es: "+ aptitudResultante);
        }else{
            //console.log("la aptitud del individuo es: "+ aptitudResultante);
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
    //console.log("la poblacion dentro de la funcion seleccionar padres es: ")
    //console.log(poblacion)
    let padresSeleccionados = [];
    let cantidadDatos = poblacion.length;

    for (let i = 0; i < cantidadDatos; i++) {
        let numeroAleatorio = Math.random().toFixed(4);
        let seleccionado = false;

        for (let j = 0; j < cantidadDatos; j++) {
            if (poblacion[j][3] >= numeroAleatorio) {
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

    /*console.log(mejorElemento);
    console.log("El mejor individuo tiene un peso de: " + mejorElemento[2] +
        " y una aptitud de: " + mejorElemento[1]);*/

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

        console.log(`El mejor individuo de la generación ${i} es: ${mejorIndividuoGeneracion[0]} con una ganancia de: ${mejorIndividuoGeneracion[1]} con un peso de: ${mejorIndividuoGeneracion[2]}`);
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
        // Asignar el valor a la variable global
        //capacidad_mochila = datos.capacidad;
        //pesos_individuos = datos.pesos;
        //ganancias_individuos = datos.ganancias;

        // Obtener la longitud de datos.pesos y pasarla a generarPoblacion
        let longitudPoblacion = obtenerLongitudPoblacion(datos.pesos);

        // Ejecutar algoritmo genético con los datos obtenidos y la capacidad como parámetro
        let poblacionInicial = generarPoblacion(datos.poblacion, longitudPoblacion);
        algoritmoGenetico(poblacionInicial, datos.generaciones, datos.probCruce, datos.probMutacion);
    } catch (error) {
        console.error(error);
    }
}


function obtenerLongitudPoblacion(pesos) {
    // Obtener la longitud de datos.pesos
    return pesos.length;
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
    if (generaciones <= 0) {
        mostrarError("La cantidad de generaciones debe ser un número positivo.");
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


document.getElementById("btnEjecutar").addEventListener("click", ejecutarAlgoritmoGenetico);

// Ejecucion de funciones
/*let cantidadPoblacion = 20; // Cantidad de población
let cantidadGeneraciones = 10; // Cantidad de generaciones
let probaCruce = 0.65; // Probabilidad de cruce
let probaMutacion = 0.001; // Probabilidad de mutación

let poblacionInicial = generarPoblacion(cantidadPoblacion);
algoritmoGenetico(poblacionInicial, cantidadGeneraciones, probaCruce, probaMutacion);*/

