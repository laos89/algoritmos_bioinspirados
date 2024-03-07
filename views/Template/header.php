<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">-->

    <link rel="stylesheet" href="<?= media(); ?>/css/normalize.css">
    <link rel="stylesheet" href="<?= media(); ?>/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?= media(); ?>/css/estilos.css">
    <title><?= $data['page_tag']; ?></title>
</head>

<body>
<div id="divLoading">
    <div>
      <img src="<?= media(); ?>/images/loading.svg" alt="Loading">
    </div>
  </div>
    <?php require_once("nav_bar.php"); ?>
