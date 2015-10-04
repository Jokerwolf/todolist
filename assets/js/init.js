/**
 * Created by jokerwolf on 18/07/15.
 */


/**
 * Side Panel
 */
var sidePanelModel = new SidePanelModel('open',
    [
        new TodoListModel('To buy', [new TodoListItemModel('Milk', true)]),
        new TodoListModel('To see', [new TodoListItemModel('Rambo'), new TodoListItemModel('Rocky'), new TodoListItemModel('Monsters Inc.')]),
        new TodoListModel('To read', [new TodoListItemModel('1984'), new TodoListItemModel('Animal Farm'), new TodoListItemModel('Fight Club')])
    ]
);
var sidePanelViewModel = new SidePanelViewModel(sidePanelModel);
sidePanelViewModel.render();

var collapseButton = document.getElementById('collapseButton');
collapseButton.addEventListener('click', collapsePanel);

var addNewListButton = document.getElementById('addList');
addNewListButton.addEventListener('click', addNewList);

//Show active todolist
var activeTodoList = sidePanelViewModel.getActiveTodoList();
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
    sidePanelViewModel.todoListsViewModel.addItem(new SidePanelTodoListViewModel(null, 'edit'));
}
