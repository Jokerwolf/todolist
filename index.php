<?php

require_once ("./server/resources/constants.php");
require_once ("./server/Loader.php");
require_once("./server/controllers/BaseController.php");
require_once("./server/models/Base.php");

require_once("./server/controllers/Home.php");
require_once("./server/models/Home.php");

echo 'Hello <br />';
$loader = new Loader($_GET);
$controller = $loader -> CreateController();
$controller -> ExecuteAction();
?>
