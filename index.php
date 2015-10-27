<?php
use com\despairsoftware\todo\server\Loader;

require_once ('./server/resources/constants.php');
require_once ('./server/Loader.php');
require_once ('./server/controllers/BaseController.php');
require_once ('./server/models/BaseModel.php');

$loader = new Loader($_GET);

?>
