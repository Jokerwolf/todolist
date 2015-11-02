/**
 * Created by jokerwolf on 20/09/15.
 */

/**
 *
 * @param lists [TodoListModel,...]
 * @constructor
 */
function SidePanelTodoListsModel(lists){
    var items = lists;

    this.addItem = function(item){
        items.push(item);
    };

    this.deleteItem = function(item){
        var index = indexOfItem(item.getTitle());

        if (index >= 0){
            items.splice(index, 1);
        }
    };

    this.editItem = function(value, newValue){
        var index = indexOfItem(value);

        if (index >= 0){
            items[index].setTitle(newValue);
        }
    };

    function indexOfItem(value){
        for (var i = 0; i < items.length; i++){
            if (items[i].getTitle() == value){
                return i;
            }
        }
    }
}

/**
 *
 * @param state
 * @param lists [TodoListModel, ...]
 * @constructor
 */
function SidePanelModel(state, lists){
    var todoLists = lists == null ? [] : lists;


    this.getItems = function(){
        return todoLists;
    };

    this.addItem = function(newList){
        todoLists.push(newList);
    };
}
