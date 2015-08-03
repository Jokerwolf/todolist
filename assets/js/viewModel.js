/**
 * Created by jokerwolf on 18/07/15.
 */
/*** ViewModel ***/
function ListItemViewModel(item, mode, editAction, deleteAction){
    this.item = item == null ? new ListItem('', false) : item;

    this.editAction = editAction == null ? function(){} : editAction;
    this.deleteAction = deleteAction == null ? function(){} : deleteAction;

    this.text = function(){
        return this.item.text;
    };

    this.isDone = function(){
        return this.item.isDone;
    };

    this.mode = mode == null ? 'display' : mode;

    this.render = function(){
        //Create list item view from template
        var template = document.getElementById('item_template');
        var li = template.cloneNode(true);
        var ul = document.getElementById('todoList');
        li.removeAttribute('id');
        li.classList.remove('hidden');

        var displayControl = li.querySelector('.item-text');
        var editControl = li.querySelector('.item-text-edit');

        displayControl.innerHTML = this.text();
        editControl.value = this.text();
        li.querySelector('.is-Done').checked = this.isDone();

        //Add event listeners
        li.querySelector('.item-text').addEventListener('dblclick', this.editAction.bind(this, this, li, 'edit'));
        li.querySelector('.item-text-edit').addEventListener('blur', this.editAction.bind(this, this, li, 'display'));
        li.querySelector('.item-delete').addEventListener('click', this.deleteAction.bind(this, this, li.querySelector('.item-delete')));

        ul.appendChild(li);

        switch (this.mode) {
            case 'edit':
                displayControl.classList.add('hidden');
                editControl.classList.remove('hidden');
                editControl.focus();
                break;
            default:
                break;
        }
    };
};

function TodoListViewModel(model){
    var model = model != null ? model : new TodoList();
    var items = [];

    function indexOfItem(value){
        for (var i = 0; i < items.length; i++){
            if (items[i].text == value){
                return i;
            }
        }
    }

    this.deleteItem = function(item, viewControl){
        model.deleteItem(item.item);

        var index = indexOfItem(item.text);

        if (index >= 0){
            items.splice(index, 1);
        }

        var li = viewControl.parentNode;
        var ul = li.parentNode;
        ul.removeChild(li);
    }

    this.editItem = function(item, viewControl, mode){
        var displayControl = viewControl.querySelector('.item-text');
        var editControl = viewControl.querySelector('.item-text-edit');

        switch (mode){
            case 'edit':
                displayControl.classList.add('hidden');
                editControl.value = displayControl.innerHTML;
                editControl.classList.remove('hidden');
                editControl.focus();
                break;
            default:
                model.editItem(displayControl.innerHTML, editControl.value);

                displayControl.innerHTML = editControl.value;
                editControl.classList.add('hidden');
                displayControl.classList.remove('hidden');
                break;
        }
    }

    for(var i = 0; i < model.getItems().length; i++){
        items.push(new ListItemViewModel(model.getItems()[i], null, this.editItem, this.deleteItem));
    }

    this.render = function(){
        var ul = document.getElementById('todoList');
        ul.innerHTML = '';
        for (var index in items){
            items[index].render();
        }
    }

    this.addItem = function(item){
        model.addItem(item.item);
        item.editAction = this.editItem;
        item.deleteAction = this.deleteItem;

        items.push(item);

        item.render();
    };
};
/*** ViewModel end ***/
