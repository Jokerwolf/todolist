/**
 * Created by jokerwolf on 18/07/15.
 */
/*** ViewModel ***/
function ListItemViewModel(item, mode, editAction, deleteAction){
    var self = this;
    this.item = item == null ? new ListItem('', false) : item;

    this.editAction = editAction == null ? function(){} : editAction;
    this.deleteAction = deleteAction == null ? function(){} : deleteAction;

    this.text = function(){
        return this.item.text;
    };

    this.isDone = function(){
        return self.item.isDone;
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
        var editControl = li.querySelector('.item-edit');

        displayControl.innerHTML = self.text();
        editControl.value = self.text();
        li.querySelector('.is-Done').checked = self.isDone();

        //Add event listeners
        li.querySelector('.item-text').addEventListener('dblclick', function(){
            self.editAction(self, li, 'edit')
        });
        li.querySelector('.item-edit').addEventListener('blur', function(){
            self.editAction(self, li, 'display')
        });
        li.querySelector('.item-delete').addEventListener('click', function(){
            self.deleteAction(self, li)
        });

        ul.appendChild(li);

        switch (self.mode) {
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
    var self = this;
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

        var ul = viewControl.parentNode;
        ul.removeChild(viewControl);
    }

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
                    //remove empty item
                    self.deleteItem(item, editControl.parentNode);
                }
                model.editItem(displayControl.innerHTML, editControl.value);
                displayControl.innerHTML = editControl.value;
                editControl.classList.add('hidden');
                displayControl.classList.remove('hidden');
                break;
            default:
                break;
        }
    }

    this.addItem = function(item){
        model.addItem(item.item);
        item.editAction = self.editItem.bind(self);
        item.deleteAction = self.deleteItem.bind(self);

        items.push(item);

        item.render();
    };

    this.render = function(){
        var ul = document.getElementById('todoList');
        ul.innerHTML = '';
        for (var index in items){
            items[index].render();
        }
    }

    //fill items from model
    for(var i = 0; i < model.getItems().length; i++){
        items.push(new ListItemViewModel(model.getItems()[i], null, self.editItem, self.deleteItem));
    }
};
/*** ViewModel end ***/
