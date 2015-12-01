<?php
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>ToDo</title>

    <link rel="stylesheet" type="text/css" href="/assets/plugins/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/theme.css">
</head>
<body>
<header class="container-fluid">
    <div class="row">
        <h1>Will only take a minute</h1>
    </div>
</header>
<div class="container wrapper">
    <form action="/account/registerUser/" method="post">
        <div class="form-group">
            <label for="username">User name</label>
            <input id="username" name="username" type="text" class="form-control">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" name="pwd" type="password" class="form-control">
        </div>
        <div class="form-group">
            <label for="confirm_password">Confirm your password</label>
            <input id="confirm_password" name="conf_pwd" type="password" class="form-control">
        </div>

        <input type="submit" value="Register" class="btn btn-default form-control">
    </form>
</div>
</body>
</html>
