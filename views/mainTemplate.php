<?php
/**
 * Created by PhpStorm.
 * User: jokerwolf
 * Date: 31/10/15
 * Time: 22:38
 */
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php echo $viewModel -> get('pageTitle');  ?></title>

    <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="assets/css/theme.css">
</head>
<body>
<header class="container-fluid">
</header>
<div class="container wrapper">

    <?php
        require($this -> viewFile);
    ?>
</div>
</body>
</html>
