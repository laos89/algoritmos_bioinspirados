<?php
    class homeModel extends Mysql{
        public function __construct(){
            parent::__construct();
        }

        //GENERAR MODELOS
        //public function setUser(string $nombre, int $edad){
            //$query_insert = "INSERT INTO usuarios(nombre,edad) VALUES(?,?)";
            //$arrData = array($nombre, $edad);
            //$request_insert = $this->insert($query_insert,$arrData);
            //return $request_insert;
        //}

    }
?>