<?php

    class Agmochila extends Controllers{
        public function __construct(){
            parent::__construct();

        }

        public function agmochila(){
            //array data contiene datos del head de la pagina
            $data['page_tag'] = "IA/AG-mochila";
            $data['page_title'] = "AG-mochila";
            $data['page_name'] = "AG-mochila";
            $data['pagina_funciones'] = "funciones_ag_mochila.js";
            $data['pagina_validaciones'] = "validaciones_ag_mochila.js";
            $this->views->getView($this,"agmochila",$data);
        }
        
        
        //GENERAR CONTROLADORES
        //public function insertar(){
          //  $data = $this->model->setUser("Yaneth",30);
            //$data = $this->model->setUser("Carlos",30);
            //print_r($data);
        //}

    }
?>