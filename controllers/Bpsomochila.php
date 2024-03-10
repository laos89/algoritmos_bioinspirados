<?php

    class Bpsomochila extends Controllers{
        public function __construct(){
            parent::__construct();

        }

        public function bpsomochila(){
            //array data contiene datos del head de la pagina
            $data['page_tag'] = "IA";
            $data['page_title'] = "BPSO-mochila";
            $data['page_name'] = "BPSO-mochila";
            $data['pagina_funciones'] = "funciones_bpso_mochila.js";
            $data['pagina_validaciones'] = "validaciones_bpso_mochila.js";
            $this->views->getView($this,"bpsomochila",$data);
        }
        
        
        //GENERAR CONTROLADORES
        //public function insertar(){
          //  $data = $this->model->setUser("Yaneth",30);
            //$data = $this->model->setUser("Carlos",30);
            //print_r($data);
        //}

    }
?>