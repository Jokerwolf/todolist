<?php
/**
 * Created by PhpStorm.
 * User: jokerwolf
 * Date: 01/11/15
 * Time: 18:19
 */
?>
<?php foreach($viewModel -> get('lists') as $row) { ?>
<li class="row form-inline padded">
    <a href="#" class="col-xs-7"><span class="item-text"><?php echo $row -> getTitle(); ?></span></a>
    <input type="text" class="item-edit col-xs-7 hidden">
    <button class="header-edit col-xs-1 btn transparent glyphicon glyphicon-edit"></button>
    <button class="item-delete col-xs-1 btn transparent glyphicon glyphicon-remove"></button>
</li>
<?php }?>