/**
 * Created by jokerwolf on 18/07/15.
 */


/**
 * Side Panel
 */
var sidePanelModel = new SidePanelModel('open',
    [
        new TodoListModel('To buy', [new TodoListItemModel('Milk'), new TodoListItemModel('Cheese'), new TodoListItemModel('Grapes')]),
        new TodoListModel('To see', [new TodoListItemModel('Rambo'), new TodoListItemModel('Rocky'), new TodoListItemModel('Monsters Inc.')]),
        new TodoListModel('To read', [new TodoListItemModel('1984', true), new TodoListItemModel('Animal Farm', true), new TodoListItemModel('Fight Club')])
    ]
);
var sidePanelViewModel = new SidePanelViewModel(sidePanelModel);
sidePanelViewModel.render();

var collapseButton = document.getElementById('collapseButton');
collapseButton.addEventListener('click', collapsePanel);

var addNewListButton = document.getElementById('addList');
addNewListButton.addEventListener('click', addNewList);

//Show active todolist
//SidePanelTodoListViewModel
var activeTodoList = sidePanelViewModel.getActiveTodoList();
//TodolistModel
var viewModel = new TodoListViewModel(activeTodoList.getModel());
viewModel.render();

//Attach event listeners
var addButtons = document.getElementsByClassName('add-item');
for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', addNewItem);
}

function addNewItem(){
    viewModel.addItem(new TodoListItemViewModel(null, 'edit'));
}

function collapsePanel(){
    sidePanelViewModel.changeCollapsedState();
}

function addNewList(){
    var newList = new TodoListModel('My new list');

    sidePanelViewModel.todoListsViewModel.addNewList(newList);
}
