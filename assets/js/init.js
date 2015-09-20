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
var addButton = document.getElementById('addItem');
addButton.addEventListener('click', addNewItem);

function addNewItem(){
    viewModel.addItem(new ListItemViewModel(null, 'edit'));
}

/**
 * Side Pane
 */
var sidePaneModel = new SidePanelModel();
var sidePanelViewModel = new SidePanelViewModel(sidePaneModel);

var collapseButton = document.getElementById('collapseButton');
collapseButton.addEventListener('click', collapsePanel)


function collapsePanel(){
    sidePanelViewModel.changeCollapsedState();
}
