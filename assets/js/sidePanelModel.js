/**
 * Created by jokerwolf on 20/09/15.
 */

function ListModel(text){
    var text = text;

    this.getText = function(){
        return text;
    }
}

function SidePanelModel(state, lists){
    this.state = state == null ? 'open' : state;
    var lists = lists == null ? [] : lists;


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
        return lists;
    }

    this.addNewList = function(newList){
        lists.push(newList);
    };
}
