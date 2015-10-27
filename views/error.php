<?php
/**
 * Created by PhpStorm.
 * User: jokerwolf
 * Date: 27/10/15
 * Time: 01:57
 */
?>
<!DOCTYPE html>
<html>
<header>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Something happened</title>

    <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="assets/css/theme.css">
</header>
<body>
<div class="container wrapper">
    <!-- Main area -->
    <div id="mainArea" class="container col-xs-10 main-area">
        <h2><?php echo $error_message; ?></h2>
    </div>
</div>
</body>
</html>