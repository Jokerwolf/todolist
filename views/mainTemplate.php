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
    <link rel="stylesheet" type="text/css" href="assets/css/checkbox.css">
    <link rel="stylesheet" type="text/css" href="assets/css/sidePanel.css">
</head>
<body>
<header class="container-fluid">
    <div class="row">
        <div id="listHeader" class="list-header">
            <h1></h1>
            <input type="text" class="header-edit list-header hidden">
            <button class="btn transparent glyphicon glyphicon-plus add-item"></button>
        </div>
        <div class="account-control">
            <button class="btn glyphicon glyphicon-user transparent"></button>
        </div>
    </div>
</header>
    <?php
        require($this -> viewFile);
    ?>
</body>
</html>
