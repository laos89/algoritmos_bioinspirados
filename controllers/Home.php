<?php

    class Home extends Controllers{
        public function __construct(){
            parent::__construct();

        }

        public function home(){
            //array data contiene datos del head de la pagina
            $data['page_tag'] = "IA";
            $data['page_title'] = "Pagina principal";
            $data['page_name'] = "home";
            $data['page_content'] = "Algoritmos Bioinspirados";
            $this->views->getView($this,"home",$data);
        }
        
        
        //GENERAR CONTROLADORES
        //public function insertar(){
          //  $data = $this->model->setUser("Yaneth",30);
            //$data = $this->model->setUser("Carlos",30);
            //print_r($data);
        //}

    }
?>