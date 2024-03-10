<?php m_header($data); ?>

<main>
    <div class="contenedor centrar-texto">
        <h1>Algoritmo BPSO-Problema de la mochila</h1>
        <p>Se busca obtener la mayor ganancia posible sin exceder la capacidad de la mochila.</p>

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form id="geneticForm" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="poblacion">Cantidad de Población:</label>
                                <span class="indicacion">Debe ser un número entero par.</span>
                                <input type="number" id="poblacion" name="poblacion" required>
                            </div>
                            <div class="col-md-6">
                                <label for="generaciones">Condicion de paro:</label>
                                <span class="indicacion">Ingrese un número entero.</span>
                                <input type="number" id="generaciones" name="generaciones" required>
                            </div>
                        </div>

                        <div class="row">
                            <h5>Selecciona archivos de tipo .txt</h5>
                            <div class="col-md-6">
                                <label for="capacidadFile">Archivo de Capacidad (.txt):</label>
                                <input type="file" class="input-archivo" id="capacidadFile" name="capacidadFile" accept=".txt" required>

                            </div>
                            <div class="col-md-6">
                                <label for="pesoFile">Archivo de Peso (.txt):</label>
                                <input type="file" class="input-archivo" id="pesoFile" name="pesoFile" accept=".txt" required>
                            </div>

                            <div class="col-md-6">
                                <label for="gananciaFile">Archivo de Ganancia (.txt):</label>
                                <input type="file" class="input-archivo" id="gananciaFile" name="gananciaFile" accept=".txt" required>
                            </div>
                            <button type="button" class="boton boton-azul" onclick="ejecutarAlgoritmoBpso()">Ejecutar</button>
                    </form>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row" id="resultadosColumna">
                </div>
            </div>
        </div>
</main>

<?php m_footer($data); ?>