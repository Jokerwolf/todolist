/**
 * Created by jokerwolf on 20/09/15.
 */

/**
 *
 * @param item TodoListModel
 * @constructor
 */
function SidePanelTodoListViewModel(item, mode, editAction, deleteAction, rerenderTitleAction, setActiveAction){
    var self = this;
    this.model = item == null ? new TodoListModel('') : item;

    this.mode = mode == null ? 'display' : mode;

    this.editAction = editAction == null ? function(){} : editAction;
    this.deleteAction = deleteAction == null ? function(){} : deleteAction;
    this.rerenderTitleAction = rerenderTitleAction == null ? function(){} : rerenderTitleAction;
    this.setActiveAction = setActiveAction == null ? function(){} : setActiveAction;

    this.getModel = function(){
        return self.model;
    };

    this.render = function(){
        var template = document.getElementById('list_template');
        var li = template.cloneNode(true);

        var list = document.getElementById('lists');

        li.removeAttribute('id');
        li.classList.remove('hidden');

        var hiddenId = li.querySelector('.list-id');
        var displayControl = li.querySelector('.item-text');
        var editControl = li.querySelector('.item-edit');

        hiddenId.value = self.model.getId();
        displayControl.innerHTML = self.model.getTitle();
        editControl.value = self.model.getTitle();

        //Add event listeners
        li.querySelector('.item-text').addEventListener('click', function(){
            self.setActiveAction(self);
        });
        li.querySelector('.header-edit').addEventListener('click', function(){
            self.editAction(self, li, 'edit');
        });
        li.querySelector('.item-edit').addEventListener('blur', function(){
            self.editAction(self, li, 'display')
        });
        li.querySelector('.item-edit').addEventListener('keypress', function(e){
            var key = e.which || e.keyCode;
            if (key === 13) { // 13 is enter
                self.editAction(self, li, 'display')
            }
        });
        li.querySelector('.item-delete').addEventListener('click', function(){
            self.deleteAction(self, li)
        });

        list.appendChild(li);

        self.model.titleObservable.subscribe(self.rerenderTitleAction.bind(self, li, self.model));

        switch (self.mode) {
            case 'edit':
                displayControl.classList.add('hidden');
                editControl.classList.remove('hidden');
                editControl.focus();
                break;
            default:
                break;
        }
    }
}

/**
 *
 * @param lists [TodoListModel,...]
 * @constructor
 */
function SidePanelTodoListsViewModel(lists){
    var self = this;
    var model = new SidePanelTodoListsModel(lists);
    var items = [];

    this.currentTodoListIndex = 0;
    this.currentTodoListIndexObservable = new Observable();

    this.getModel = function(){
        return model.getItems();
    };

    this.getLength = function() {
        return items.length;
    };

    this.getElementAt = function(index){
        return items[index];
    };

    this.addItem = function (newListViewModel){
        //update model
        model.addItem(newListViewModel.getModel());

        //update view model
        newListViewModel.editAction = self.editItem.bind(self);
        newListViewModel.deleteAction = self.deleteItem.bind(self);
        newListViewModel.rerenderTitleAction = self.renderTitle.bind(self);
        newListViewModel.setActiveAction = self.setActiveTodoList.bind(self);

        items.push(newListViewModel);

        newListViewModel.render();

        if (items.length == 1){
            self.setActiveTodoList(newListViewModel);
        }
    };

    this.deleteItem = function(item, viewControl){
        //update model
        model.deleteItem(item.getModel());

        //update view model
        var index = indexOfItem(item.getModel().getTitle());

        if (index >= 0){
            items.splice(index, 1);
        }

        var ul = viewControl.parentNode;
        ul.removeChild(viewControl);
    };

    this.renderTitle = function(viewControl, model){
        console.log('I\'m SidePanelTodoListsViewModel and I\'m renderTitle: ' + viewControl.toString() + ' ' + model.getTitle());
        var displayControl = viewControl.querySelector('.item-text');
        var editControl = viewControl.querySelector('.item-edit');

        displayControl.innerHTML = model.getTitle();
        editControl.value = model.getTitle();
    };

    this.editItem = function(item, viewControl, mode){
        var displayControl = viewControl.querySelector('.item-text');
        var editControl = viewControl.querySelector('.item-edit');

        switch (mode){
            case 'edit':
                displayControl.classList.add('hidden');
                editControl.value = displayControl.innerHTML;
                editControl.classList.remove('hidden');
                editControl.focus();
                break;
            case 'display':
                if (editControl.value === '' || editControl.value === null){
                    if (displayControl.innerHTML === '' || displayControl.innerHTML === null) {
                        //remove empty item
                        self.deleteItem(item, editControl.parentNode);
                    }
                } else {
                    //update model
                    model.editItem(displayControl.innerHTML, editControl.value);

                    displayControl.innerHTML = editControl.value;
                    editControl.classList.add('hidden');
                    displayControl.classList.remove('hidden');
                }
                break;
            default:
                break;
        }
    };

    this.getActiveTodoList = function(){
        return self.getElementAt(self.currentTodoListIndex);
    };

    this.setActiveTodoList = function(item){
        self.currentTodoListIndex = indexOfItem(item.getModel().title);
        self.currentTodoListIndexObservable.fire(self.currentTodoListIndex, self);
    };

    this.render = function() {
        for(var i = 0; i < items.length; i++){
            items[i].render();
        }
    };

    //fill items
    for (var i = 0; i < lists.length; i++){
        items.push(new SidePanelTodoListViewModel(lists[i], null, self.editItem, self.deleteItem, self.renderTitle, self.setActiveTodoList));
    }

    function indexOfItem(value){
        for (var i = 0; i < items.length; i++){
            if (items[i].getModel().title == value){
                return i;
            }
        }
    }
}

/**
 *
 * @param model SidePanelModel
 * @constructor
 */
function SidePanelViewModel(model, state){
    var self = this;
    this.state = state == null ? 'open' : state;
    this.todoListsViewModel = new SidePanelTodoListsViewModel(model.getItems());

    var initState = saveInitState();

    this.getModel = function(){
        return this.todoListsViewModel.getModel();
    }

    this.getPanelState = function(){
        return this.state;
    };

    this.changeCollapsedState = function(){
        var state = self.getPanelState();

        var sidePanel = document.getElementById('sidePanel');
        var mainArea = document.getElementById('mainArea');
        var collapseButton = document.getElementById('collapseButton');

        if (state === 'open'){
            //Collapse
            sidePanel.style.margin = '0 0 0 -14.5%';
            mainArea.style.width = '97.5%';

            collapseButton.classList.remove('glyphicon-arrow-left');
            collapseButton.classList.add('glyphicon-arrow-right')
        } else {
            //Return initState
            sidePanel.style.margin = initState['sidePanel'];
            mainArea.style.width = initState['mainArea'];

            collapseButton.classList.remove('glyphicon-arrow-right');
            collapseButton.classList.add('glyphicon-arrow-left')
        }

        inverseState();
    };

    this.render = function(){
        //render lists
        self.todoListsViewModel.render();
    };

    function inverseState(){
        if (self.state === 'open') {
            self.state = 'collapse';
        } else {
            self.state = 'open';
        }
    };

    function saveInitState(){
        var sidePanel = document.getElementById('sidePanel');
        var mainArea = document.getElementById('mainArea');

        return { sidePanel: sidePanel.style.margin, mainArea: mainArea.style.width };
    }
}