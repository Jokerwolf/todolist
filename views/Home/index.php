<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>ToDo</title>

    <link rel="stylesheet" type="text/css" href="/assets/plugins/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="/assets/css/theme.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/checkbox.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/sidePanel.css">
</head>
<body>

<header class="container-fluid">
    <div class="row">
        <div id="listHeader" class="list-header">
            <h1></h1>
            <input type="text" class="header-edit list-header hidden">
            <button class="btn transparent glyphicon glyphicon-plus add-item"></button>
        </div>
        <div id="accountControl" class="account-control popup-anchor">
            <button id="account" class="btn glyphicon glyphicon-user transparent"></button>
            <ul id="accountPopup" class="popup hidden">
                <li class="transparent">
                    <a href="/account/logout">Account</a>
                </li>
                <li class="transparent">
                    <a href="/account/logout">Something</a>
                </li>
                <li class="transparent">
                    <a href="/account/logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</header>

<div class="container wrapper">
    <!-- Side panel -->
    <nav id="sidePanel" class="container col-xs-2 side-panel">
        <div class="list col-xs-1">
            <ul id="lists">
            </ul>

            <button id="addList" class="btn glyphicon glyphicon-plus col-xs-1"></button>
            <button id="saveAll" class="btn glyphicon glyphicon-save col-xs-1"></button>
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
    <a href="#" class="col-xs-7"><input class="list-id" type="hidden"><span class="item-text"></span></a>
    <input type="text" class="item-edit col-xs-7 hidden">
    <button class="header-edit col-xs-1 btn transparent glyphicon glyphicon-edit"></button>
    <button class="item-delete col-xs-1 btn transparent glyphicon glyphicon-remove"></button>
</li>

<script src="/assets/js/listModel.js"></script>
<script src="/assets/js/listViewModel.js"></script>

<script src="/assets/js/sidePanelModel.js"></script>
<script src="/assets/js/sidePanelViewModel.js"></script>

<script src="/assets/js/observer.js"></script>

<script src="/assets/js/init.js"></script>

<script src="/assets/plugins/bootstrap/js/bootstrap.js"></script>

</body>
</html>