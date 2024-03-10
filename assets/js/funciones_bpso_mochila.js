let capacidad_mochila = 0;
let pesos_individuos = 0;
let ganancias_individuos = 0;
let c1 = 2;
let c2 = 2;
let w = .721;

async function ejecutarAlgoritmoBpso() {
  try {
    if (!await validarDatos()) {
      return;
    }
    // Obtener datos desde la interfaz
    var datos = await obtenerDatos();

    // Obtener la longitud de datos.pesos y pasarla a generarPoblacion
    let longitudPoblacion = obtenerLongitudPoblacion(datos.pesos);
    console.log("la capacidad de la mochila es de :" + capacidad_mochila);
    console.log("el peso de los individuos es: " + pesos_individuos);
    console.log("las ganancias de los individuos es: " + ganancias_individuos);

    // Ejecutar algoritmo genético con los datos obtenidos y la capacidad como parámetro
    let poblacionInicial = generarPoblacion(datos.poblacion, longitudPoblacion);
    console.log(poblacionInicial.poblacion)
    console.log(poblacionInicial.memoria)
    console.log(poblacionInicial.velocidad)
    algoritmoBpso(poblacionInicial.poblacion, poblacionInicial.memoria, poblacionInicial.velocidad, datos.generaciones, datos.poblacion, longitudPoblacion);
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("btnEjecutar").addEventListener("click", ejecutarAlgoritmoBpso);

function generarPoblacion(cantidadDatos, longitud) {
  let poblacion = [];
  let memoria = [];
  let velocidad = [];

  for (let i = 0; i < cantidadDatos; i++) {
    let datoBinario = Array.from({ length: longitud }, () => (Math.random() < 0.5 ? 0 : 1));
    poblacion.push(datoBinario);
    let velocidadBinaria = Array.from({ length: longitud }, () => (Math.random() * 8 - 4));
    velocidad.push(velocidadBinaria);
  }

  // Hacer una copia profunda de poblacion para asignar a memoria
  memoria = poblacion.map(row => [...row].map(Number)); // Convertir a números
  console.log(poblacion);
  console.log(memoria);
  console.log(velocidad);

  return {
    poblacion: poblacion,
    memoria: memoria,
    velocidad: velocidad
  };
}


function calcularAptitud(particula) {
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

  return ganancia;
}

function sigmoide(vid) {
  return 1 / (1 + Math.exp(-vid));
}

function algoritmoBpso(posicion, memoria, velocidad, condicion_paro, particulas, posiciones) {
  let x = posicion
  let p = memoria
  let v = velocidad
  let g = 0;

  for (let h = 0; h < condicion_paro; h++) {
    console.log("vuelta: ", h);
    //console.log("la POBLACION DE ENTRADA es: ", x);
    //console.log("la MEMORIA DE ENTRADA es: ", p);
    //console.log("la VELOCIDAD DE ENTRADA es:  ", v);

    for (let i = 0; i < particulas; i++) {
      let ganancia_x = calcularAptitud(x[i]);
      let ganancia_p = calcularAptitud(p[i]);
      console.log("la ganancia de x es: " + ganancia_x);
      console.log("la ganancia de p es: " + ganancia_p);

      if (ganancia_x > ganancia_p) {
        console.log("cambio de particula de posicion a memoria");
        p[i] = JSON.parse(JSON.stringify(x[i])); // Copia profunda
      }

      g = i;
      //console.log("el valor de g es: " + g);

      for (let j = 0; j < particulas; j++) {
        let ganancia_pg = calcularAptitud(p[g]);
        let ganancia_pj = calcularAptitud(p[j]);

        if (ganancia_pj > ganancia_pg) {
          g = j;
          console.log("se ha cambiado el valor de g, ahora es: " + g);
        }
      }

      for (let d = 0; d < posiciones; d++) {
        let r1 = Math.random();
        let r2 = Math.random();
        let rand = Math.random();
        //console.log("ENTRANDO A POSICION POR POSICION");

        let vid =
          w * v[i][d] +
          c1 * r1 * (p[i][d] - x[i][d]) +
          c2 * r2 * (p[g][d] - x[i][d]);

        if (vid < -4) {
          vid = -4;
        }

        if (vid > 4) {
          vid = 4;
        }

        v[i][d] = vid;

        let svid = sigmoide(vid);
        //console.log("rand vale: ", rand);
        //console.log("svid vale: ", svid);
        //console.log("el valor de vid es: ", x[i][d]);

        if (rand < svid) {
          //console.log("el numero cambio a 1")
          x[i][d] = 1;
        } else {
          //console.log("el numero cambio a 0")
          x[i][d] = 0;
        }
      }
    }
  }
  //console.log("la POBLACION DE SALIDA es: ", x);
  //console.log("la MEMORIA DE SALIDA es: ", p);
  //console.log("la VELOCIDAD DE SALIDA es: ", v);

  console.log("el resutado es: ", p[g]);
  mostrarResultados(p[g]);
  return p[g];
}
