/**
 * Created by jokerwolf on 18/07/15.
 */

/**
 * List
 */
//Create Model
var model = new TodoList();

//Create View Model
var viewModel = new TodoListViewModel(model);
viewModel.render();

//Attach event listeners
var addButtons = document.getElementsByClassName('add-item');
for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', addNewItem);
}

function addNewItem(){
    viewModel.addItem(new ListItemViewModel(null, 'edit'));
}

/**
 * Side Panel
 */
var sidePaneModel = new SidePanelModel('open', [ new ListModel('To buy'), new ListModel('To see'), new ListModel('To read') ]);
var sidePanelViewModel = new SidePanelViewModel(sidePaneModel);

var collapseButton = document.getElementById('collapseButton');
collapseButton.addEventListener('click', collapsePanel);

var addNewListButton = document.getElementById('addList');
addNewListButton.addEventListener('click', addNewList);

sidePanelViewModel.render();

function collapsePanel(){
    sidePanelViewModel.changeCollapsedState();
}

function addNewList(){
    var newList = new ListModel('My new list');

    sidePanelViewModel.listsViewModel.addNewList(newList);
}
