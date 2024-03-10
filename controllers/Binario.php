<?php

    class Binario extends Controllers{
        public function __construct(){
            parent::__construct();

        }

        public function binario(){
            //array data contiene datos del head de la pagina
            $data['page_tag'] = "IA/AG-binario";
            $data['page_title'] = "AG-binario";
            $data['page_name'] = "AG-binario";
            $data['pagina_funciones'] = "funciones_ag_binario.js";
            $data['pagina_validaciones'] = "validaciones_ag_binario.js";
            $this->views->getView($this,"binario",$data);
        }
        
        
        //GENERAR CONTROLADORES
        //public function insertar(){
          //  $data = $this->model->setUser("Yaneth",30);
            //$data = $this->model->setUser("Carlos",30);
            //print_r($data);
        //}

    }
?>