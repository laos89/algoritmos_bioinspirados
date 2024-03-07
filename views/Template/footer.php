<!-- variable para utilizar en javascript con directorio raiz-->
<script>
  const base_url = "<?= base_url(); ?>";
</script>

<!-- bootstrap -->
<script src="<?= media(); ?>/js/bootstrap.min.js ?>"></script>

<!--sweetalert-->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.all.min.js"></script>

<!--validaciones-->
<?php if(!empty($data['pagina_validaciones'])){?>
  <script src="<?= media();?>/js/validaciones/<?= $data['pagina_validaciones'] ?>"></script>
<?php }?>

<!-- cargar archivos de funciones js que se manda desde el controlador -->
<script src="<?= media(); ?>/js/<?= $data['pagina_funciones'] ?>"></script>

</body>
</html>
