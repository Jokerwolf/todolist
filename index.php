<?php

require_once ("server/resources/constants.php");

require("server/base/Loader.php");
require("server/base/BaseController.php");
require("server/base/BaseModel.php");
require("server/base/View.php");
require("server/base/ViewModel.php");

$loader = new Loader($_GET);
$controller = $loader -> createController();
$controller -> executeAction();
?>
