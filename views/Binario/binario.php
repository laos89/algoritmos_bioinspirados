<?php m_header($data); ?>

<main>
    <div class="contenedor centrar-texto">
        <h1>Algoritmo Genético Binario</h1>
        <p>Ejecuta la función seno sobre el valor decimal de un número binario y busca el que tenga el mayor valor.</p>

        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <form id="geneticForm">
                        <label for="poblacion">Cantidad de Población:</label>
                        <span class="indicacion">Debe ser un número entero par.</span>
                        <input type="number" id="poblacion" name="poblacion" required>


                        <label for="generaciones">Cantidad de Generaciones:</label>
                        <span class="indicacion">Ingrese un número entero positivo.</span>
                        <input type="number" id="generaciones" name="generaciones" required>


                        <label for="probCruce">Probabilidad de Cruce (%):</label>
                        <span class="indicacion">Ingrese un valor entre 0 y 1. Recomendado entre 0.65 y 0.80</span>
                        <input type="number" id="probCruce" name="probCruce" min="0" max="100" required>

                        <label for="probMutacion">Probabilidad de Mutación (%):</label>
                        <span class="indicacion">Ingrese un valor entre 0 y 1. Recomendado entre 0.01 y 0.001</span>
                        <input type="number" id="probMutacion" name="probMutacion" min="0" max="100" required>

                        <button type="button" class="boton boton-azul" onclick="ejecutarAlgoritmoGenetico()">Ejecutar</button>
                    </form>

                </div>
                <div class="col-md-8" id="resultadosColumna">
                    <h2>Resultado</h2>

                </div>

            </div>

        </div>

    </div>
</main>

<?php m_footer($data); ?>