/*** Model ***/
function TodoListItemModel(id, text, isDone) {
	var self = this;

	this.id = id;
	this.text = text;
	this.isDone = isDone;

	this.constructDTO = function(){
		return {
			id: self.id,
			text: self.text,
			isDone: self.isDone
		};
	};
}

/**
 *
 * @param title
 * @param items [TodoListItemModel,...]
 * @constructor
 */
function TodoListModel(title, items, id){
    var self = this;
	var items = items != null ? items : [];

	this.id = id;
    this.title = title;
	this.titleObservable = new Observable();

	this.getId = function(){
		return self.id;
	};

    this.getTitle = function(){
        return self.title;
    };

	this.setTitle = function(title){
		self.title = title;
		self.titleObservable.fire(title, self);
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
	};

	this.constructDTO = function(){
		return {
			id: self.id,
			title: self.title,
			items: items.map(function(todoListItem){
				return todoListItem.constructDTO();
			})
		}
	};

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

