/*** Model ***/
function ListItem(text, isDone) {
	this.text = text;
	this.isDone = isDone;
};

function TodoList(items, addItem, deleteItem, editItem){
	var items = items != null ? items : [];

    this.getItems = function(){
        return items;
    }

	this.addItem = addItem != null ? addItem : function(item){
		items.push(item);
	};

	this.deleteItem = deleteItem != null ? deleteItem : function(item){
		var index = indexOfItem(item.text);		

		if (index >= 0){
			items.splice(index, 1);
		}
	};

	this.editItem = editItem != null ? editItem : function(value, newValue){
		var index = indexOfItem(value);

		if (index >= 0){
			items[index].text = newValue;
		}
	}

	function indexOfItem(value){
		for (var i = 0; i < items.length; i++){
			if (items[i].text == value){
				return i;
			}
		}
	}
};
/*** Model end ***/

