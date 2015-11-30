/**
 * Created by jokerwolf on 18/07/15.
 */

/**
 * Side Panel
 */

getTodoLists();

function getTodoLists(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var lists = [];
            var response = JSON.parse(xhttp.response);
            for (var list in response){
                var items = [];
                for (var item in response[list].items){
                    items.push(new TodoListItemModel(response[list].items[item].id,
                        response[list].items[item].value,
                        response[list].items[item].is_completed));
                }
                lists.push(new TodoListModel(response[list].title, items, response[list].id));
            }

            renderPage(lists);
        }
    }
    xhttp.open("GET", "/home/getLists/", true);
    xhttp.send();
}
/**
 *
 * @param model [TodoListModel, ... ]
 */
function saveTodoLists(model){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

        }
    };
    xhttp.open("POST", "/home/saveLists", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(model.map(function(todolist){
        return todolist.constructDTO();
    })));
}


function renderPage(lists){
    //render SidePanel
    var sidePanelModel = new SidePanelModel('open', lists);
    var sidePanelViewModel = new SidePanelViewModel(sidePanelModel);
    sidePanelViewModel.render();

    var collapseButton = document.getElementById('collapseButton');
    collapseButton.addEventListener('click', collapsePanel);

    var editListButtons = document.getElementsByClassName('edit-item');
    for(var i = 0; i < editListButtons.length; i++){
        editListButtons[i].addEventListener('click', editList());
    }

    var addNewListButton = document.getElementById('addList');
    addNewListButton.addEventListener('click', addNewList);

    var saveAllButton = document.getElementById('saveAll');
    saveAllButton.addEventListener('click', saveAll);

    //Attach event listeners
    var addButtons = document.getElementsByClassName('add-item');
    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].removeEventListener('click', addNewItem);
        addButtons[i].addEventListener('click', addNewItem);
    }

    var accountButton = document.getElementById('account');
    accountButton.addEventListener('click', openAccountPopup);
    document.addEventListener('click', closeAccountPopup);
//    var popupAnchors = document.getElementsByClassName('popup-anchor');
//    for (var i = 0; i < popupAnchors.length; i++){
//        var popups = popupAnchors[i].getElementsByClassName('popup');
//        for (var j = 0; j < popups.length; j++){
//            popups[j].addEventListener('blur', closeAccountPopup);
//        }
//    }

    //Show active todolist
    sidePanelViewModel.todoListsViewModel.currentTodoListIndexObservable.subscribe(renderCurrentTodoList);
    var todoListViewModel = new TodoListViewModel(null);
    renderCurrentTodoList();


    function openAccountPopup(){
        var popup = this.parentElement.getElementsByClassName('popup')[0];
        popup.classList.remove('hidden');
        popup.focus();
    }

    function closeAccountPopup(event){
//        if (!$(event.target).closest('#accountPopup').length) {
//            // Hide the menus.
//        }
        this.classList.add('hidden');
    }

    function addNewItem(){
        todoListViewModel.addItem(new TodoListItemViewModel(null, 'edit'));
    }

    function renderCurrentTodoList(){
        var activeTodoList = sidePanelViewModel.todoListsViewModel.getActiveTodoList();
        if (activeTodoList != null) {
            todoListViewModel.setModel(activeTodoList.getModel());
            todoListViewModel.render();
        }
    }

    function editList(){
        sidePanelViewModel.todoListsViewModel.editItem();
    }

    function collapsePanel(){
        sidePanelViewModel.changeCollapsedState();
    }

    function addNewList(){
        sidePanelViewModel.todoListsViewModel.addItem(new SidePanelTodoListViewModel(null, 'edit'));
    }

    function saveAll(){
        saveTodoLists(sidePanelViewModel.getModel());
    }
}
