<?php
/**
 * Created by PhpStorm.
 * User: jokerwolf
 * Date: 11/11/15
 * Time: 01:06
 */
?>

<!DOCTYPE html>
<html>
<head>
    <title>Welcome to ToDo</title>
    <link rel="stylesheet" type="text/css" href="/assets/plugins/bootstrap/css/bootstrap.css">
</head>
<body>
<header class="jumbotron">
    <h1>Welcome to ToDo <br/>Just login and let's do some stuff</h1>
</header>
<div class="container col-xs-4 col-xs-offset-4">
    <form action="/account/login/" method="post" class="form-signin">
        <div class="form-group">
            <label for="username">User name</label>
            <input id="username" name="username" type="text" class="form-control">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" name="pwd" type="password" class="form-control">
        </div>

        <input type="submit" value="Login" class="btn btn-default form-control">

        <div class="form-group">
            <a href="/account/register">Register</a>
            <a href="/account/restore">Forgot your password?</a>
        </div>
    </form>
</div>
</body>
</html>