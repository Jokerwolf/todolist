/**
 * Created by jokerwolf on 20/09/15.
 */

/**
 *
 * @param item TodoListModel
 * @constructor
 */
function SidePanelTodoListViewModel(item){
    var item = item == null ? {} : item;

    this.getModel = function(){
        return item;
    }

    this.render = function(){
        var template = document.getElementById('list_template');
        var li = template.cloneNode(true);

        var list = document.getElementById('lists');

        li.removeAttribute('id');
        li.classList.remove('hidden');

        var displayControl = li.querySelector('.item-text');
        var editControl = li.querySelector('.item-edit');

        displayControl.innerHTML = item.getTitle();
        editControl.value = item.getTitle();

        list.appendChild(li);
    }
}

/**
 *
 * @param lists [TodoListModel,...]
 * @constructor
 */
function SidePanelTodoListsViewModel(lists){
    var self = this;
    var model = lists;
    var items = [];

    this.getLength = function() {
        return items.length;
    };

    this.getElementAt = function(index){
        return items[index];
    };

    /**
     *
     * @param newList TodoListModel
     */
    this.addNewList = function(newList){
        model.push(newList);
        var newItem = new SidePanelTodoListViewModel(newList);

        items.push(newItem);
        newItem.render();
    }

    this.render = function() {
        for(var i = 0; i < items.length; i++){
            items[i].render();
        }
    }

    //fill items
    for (var i = 0; i < lists.length; i++){
        items.push(new SidePanelTodoListViewModel(lists[i]));
    }
}

/**
 *
 * @param model SidePanelModel
 * @constructor
 */
function SidePanelViewModel(model){
    var self = this;
    this.todoListsViewModel = new SidePanelTodoListsViewModel(model.getItems());

    var initState = saveInitState();

    this.changeCollapsedState = function(){
        var state = model.getPanelState();

        var sidePanel = document.getElementById('sidePanel');
        var mainArea = document.getElementById('mainArea');
        var collapseButton = document.getElementById('collapseButton');

        if (state === 'open'){
            //Collapse
            sidePanel.style.margin = '0 0 0 -14.5%';
            mainArea.style.width = '97%';

            collapseButton.classList.remove('glyphicon-arrow-left');
            collapseButton.classList.add('glyphicon-arrow-right')
        } else {
            //Return initState
            sidePanel.style.margin = initState['sidePanel'];
            mainArea.style.width = initState['mainArea'];

            collapseButton.classList.remove('glyphicon-arrow-right');
            collapseButton.classList.add('glyphicon-arrow-left')
        }
        model.inverseState();
    };

    this.render = function(){
        //render lists
        self.todoListsViewModel.render();
    };

    this.getActiveTodoList = function(){
        //DUMMY
        return self.todoListsViewModel.getElementAt(2)
    }

    function saveInitState(){
        var sidePanel = document.getElementById('sidePanel');
        var mainArea = document.getElementById('mainArea');

        return { sidePanel: sidePanel.style.margin, mainArea: mainArea.style.width };
    }
}