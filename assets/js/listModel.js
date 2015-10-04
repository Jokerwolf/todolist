/*** Model ***/
function TodoListItemModel(text, isDone) {
	this.text = text;
	this.isDone = isDone;
};

/**
 *
 * @param title
 * @param items [TodoListItemModel,...]
 * @constructor
 */
function TodoListModel(title, items){
    var self = this;
	var items = items != null ? items : [];
    this.title = title;

    this.getTitle = function(){
        return self.title;
    };

	this.setTitle = function(title){
		self.title = title;
	};

    this.getItems = function(){
        return items;
    };

	this.addItem = function(item){
		items.push(item);
	};

	this.deleteItem = function(item){
		var index = indexOfItem(item.text);		

		if (index >= 0){
			items.splice(index, 1);
		}
	};

	this.editItem = function(value, newValue){
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

        return null;
	}
};
/*** Model end ***/

