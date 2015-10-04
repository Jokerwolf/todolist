/**
 * Created by jokerwolf on 18/07/15.
 */

/*** ViewModel ***/
/**
 *
 * @param item TodoListItemModel
 * @param mode
 * @param editAction
 * @param deleteAction
 * @constructor
 */
function TodoListItemViewModel(item, mode, editAction, deleteAction){
    var self = this;
    this.item = item == null ? new TodoListItemModel('', false) : item;

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

        li.querySelector('.is-Done').addEventListener('change', function(e){
            var li = e.srcElement.parentNode.parentNode;

            if (e.srcElement.checked){
                li.classList.add('done');
            } else {
                li.classList.remove('done');
            }
        });

        //Add event listeners
        li.querySelector('.item-text').addEventListener('dblclick', function(){
            self.editAction(self, li, 'edit')
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

        li.querySelector('.is-Done').checked = self.isDone();
        li.querySelector('.is-Done').dispatchEvent(new Event('change'));
    };
};

/**
 *
 * @param model TodoListModel
 * @constructor
 */
function TodoListViewModel(model){
    var self = this;
    var model = model != null ? model : new TodoListModel();
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
                    //remove empty item
                    self.deleteItem(item, editControl.parentNode);
                } else {
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

    this.addItem = function(item){
        model.addItem(item.item);
        item.editAction = self.editItem.bind(self);
        item.deleteAction = self.deleteItem.bind(self);

        items.push(item);

        item.render();
    };

    this.editTitle = function(mode){
        var displayControl = document.getElementById('listHeader').querySelector('h1');
        var editControl = document.getElementById('listHeader').querySelector('.header-edit');

        switch (mode){
            case 'edit':
                displayControl.classList.add('hidden');
                editControl.value = displayControl.innerHTML;
                editControl.classList.remove('hidden');
                editControl.focus();
                break;
            case 'display':
                if (editControl.value !== '' && editControl.value !== null) {
                    //do not change list header if new value is empty
                    model.setTitle(editControl.value);
                    displayControl.innerHTML = editControl.value;
                }

                editControl.classList.add('hidden');
                displayControl.classList.remove('hidden');

                break;
        }
    }

    this.render = function(){
        //render header
        var headerDisplayControl = document.getElementById('listHeader').querySelector('h1');
        var headerEditControl = document.getElementById('listHeader').querySelector('.header-edit');
        headerDisplayControl.innerHTML = model.getTitle();

        headerDisplayControl.addEventListener('dblclick', function(){
            self.editTitle('edit');
        });
        headerEditControl.addEventListener('blur', function(){
            self.editTitle('display');
        });

        //render content
        var ul = document.getElementById('todoList');
        ul.innerHTML = '';
        for (var index in items){
            items[index].render();
        }
    }

    //fill items from model
    for(var i = 0; i < model.getItems().length; i++){
        items.push(new TodoListItemViewModel(model.getItems()[i], null, self.editItem, self.deleteItem));
    }
};
/*** ViewModel end ***/
