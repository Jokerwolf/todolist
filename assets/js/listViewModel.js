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
    this.item = item == null ? new TodoListItemModel(-1, '', false) : item;

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
            item.isDone = e.srcElement.checked
        });

        //Add event listeners
        li.querySelector('.item-text').addEventListener('dblclick', function(){
            self.editAction(self, li, 'edit')
        });
        li.querySelector('.item-edit').addEventListener('blur', function(){
            if (!this.classList.contains('hidden')) {
                self.editAction(self, li, 'display');
            }
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
    this.model = model != null ? model : new TodoListModel();
    //[TodoListItemViewModel]
    var items = [];

    function indexOfItem(value){
        for (var i = 0; i < items.length; i++){
            if (items[i].text == value){
                return i;
            }
        }
    }

    this.getModel = function(){
        return self.model;
    };

    this.setModel = function(model){
        self.model = model;
        fillItems();
    };

    this.deleteItem = function(item, viewControl){
        self.model.deleteItem(item.item);


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
                    self.model.editItem(displayControl.innerHTML, editControl.value);
                    displayControl.innerHTML = editControl.value;
                    editControl.classList.add('hidden');
                    displayControl.classList.remove('hidden');

                    item.item.hasChangesObservable.fire(self.model.id);
                }
                break;
            default:
                break;
        }
    };

    this.addItem = function(item){
        self.model.addItem(item.item);
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
                    self.model.setTitle(editControl.value);
                    displayControl.innerHTML = editControl.value;
                }

                editControl.classList.add('hidden');
                displayControl.classList.remove('hidden');

                break;
        }
    };

    this.rerenderTitle = function(viewControl, model){
        var displayControl = viewControl.querySelector('h1');
        var editControl = viewControl.querySelector('.header-edit');

        displayControl.innerHTML = self.model.getTitle();
        editControl.value = self.model.getTitle();
    };

    this.render = function(){
        //render header
        var headerDisplayControl = document.getElementById('listHeader').querySelector('h1');
        headerDisplayControl.innerHTML = self.model.getTitle();

        var headerEditControl = document.getElementById('listHeader').querySelector('.header-edit');
        headerDisplayControl.addEventListener('dblclick', function(){
            self.editTitle('edit');
        });
        headerEditControl.addEventListener('blur', function(){
            if (!this.classList.contains('hidden')) {
                self.editTitle('display');
            }
        });
        headerEditControl.addEventListener('keypress', function(e){
            var key = e.which || e.keyCode;
            if (key === 13) {
                // 13 is enter
                self.editTitle('display');
            }
        });

        self.model.titleObservable.subscribe(self.rerenderTitle.bind(self, document.getElementById('listHeader'), self.model));

        //render content
        var ul = document.getElementById('todoList');
        ul.innerHTML = '';
        for (var index in items){
            items[index].render();
        }
    }

    function fillItems(){
        //fill items from model
        items = [];
        for(var i = 0; i < self.model.getItems().length; i++){
            items.push(new TodoListItemViewModel(self.model.getItems()[i], null, self.editItem, self.deleteItem));
        }
    }

    fillItems();
};
/*** ViewModel end ***/
