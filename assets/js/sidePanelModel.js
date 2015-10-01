/**
 * Created by jokerwolf on 20/09/15.
 */
/**
 *
 * @param state
 * @param lists [TodoListModel, ...]
 * @constructor
 */
function SidePanelModel(state, lists){
    this.state = state == null ? 'open' : state;
    var todoLists = lists == null ? [] : lists;


    this.getPanelState = function(){
        return this.state;
    };

    this.inverseState = function(){
        if (this.state === 'open') {
            this.state = 'collapse';
        } else {
            this.state = 'open';
        }
    };

    this.getItems = function(){
        return todoLists;
    }

    this.addNewList = function(newList){
        todoLists.push(newList);
    };
}
