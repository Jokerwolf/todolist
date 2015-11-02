<?php
/**
 * Created by PhpStorm.
 * User: jokerwolf
 * Date: 31/10/15
 * Time: 23:17
 */

?>
<div class="container wrapper">
    <!-- Side panel -->
    <nav id="sidePanel" class="container col-xs-2 side-panel">

        <div class="list col-xs-1">
            <ul id="lists">
                <?php require("_sidepanel.php"); ?>
            </ul>

            <button id="addList" class="btn glyphicon glyphicon-plus col-xs-1"></button>
        </div>

        <button id="collapseButton" class="collapse-button btn glyphicon glyphicon-arrow-left"></button>

    </nav>

    <!-- Main area -->
    <div id="mainArea" class="container col-xs-10 main-area">
        <ul id="todoList">
        </ul>
        <button class="btn glyphicon glyphicon-plus add-item"></button>
    </div>
</div>

<!-- New item template -->
<li id="item_template" class="hidden row form-inline padded">
    <label class="col-xs-1">
        <input type="checkbox" class="is-Done"/>
        <span></span>
    </label>
    <span class="item-text col-xs-10"></span>
    <input type="text" class="item-edit col-xs-10 hidden">
    <button class="item-delete col-xs-1 btn transparent glyphicon glyphicon-remove"></button>
</li>

<!-- New list template -->
<li id="list_template" class="hidden row form-inline padded">
    <a href="#" class="col-xs-7"><span class="item-text"></span></a>
    <input type="text" class="item-edit col-xs-7 hidden">
    <button class="header-edit col-xs-1 btn transparent glyphicon glyphicon-edit"></button>
    <button class="item-delete col-xs-1 btn transparent glyphicon glyphicon-remove"></button>
</li>

<script src="assets/js/listModel.js"></script>
<script src="assets/js/listViewModel.js"></script>

<script src="assets/js/sidePanelModel.js"></script>
<script src="assets/js/sidePanelViewModel.js"></script>

<script src="assets/js/observer.js"></script>

<script src="assets/js/init.js"></script>

<script src="assets/plugins/bootstrap/js/bootstrap.js"></script>