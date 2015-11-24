/*** Model ***/
function TodoListItemModel(id, text, isDone) {
	var self = this;

	this.id = id;
	this.text = text;
	this.isDone = isDone;
    this.isDeleted = 0;

    this.hasChangesObservable = new Observable();

    this.hasChangesObservable.subscribe(save);

    function save(listId){
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

            }
        };
        xhttp.open("POST", "/home/saveItem", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(self.constructDTO(listId)));
    };

	this.constructDTO = function(listId){
		return {
			id: self.id,
			text: self.text,
			isDone: self.isDone,
            isDeleted: self.isDeleted,
            listId: listId
		};
	};
}

/**
 *
 * @param title
 * @param items [TodoListItemModel,...]
 * @constructor
 * @param id
 */
function TodoListModel(title, items, id){
    var self = this;
	var items = items != null ? items : [];

	this.id = id != null ? id : -1;
    this.title = title;
    this.isDeleted = 0;
	this.titleObservable = new Observable();
    this.hasChangesObservable = new Observable();
    this.hasChangesObservable.subscribe(save);

	this.getId = function(){
		return self.id;
	};

    this.getTitle = function(){
        return self.title;
    };

	this.setTitle = function(title){
		self.title = title;
		self.titleObservable.fire(title, self);
        self.hasChangesObservable.fire(self);
	};

    //Get only not deleted items
    this.getItems = function(){
        return items.filter(isShow);
    };

	this.addItem = function(item){
		items.push(item);
	};

	this.deleteItem = function(item){
		var index = indexOfItem(item.text);		

		if (index >= 0){
			//items.splice(index, 1);
            items[index].isDeleted = 1;
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
            isDeleted: self.isDeleted,
			items: items.map(function(todoListItem){
				return todoListItem.constructDTO(self.id);
			})
		}
	};

    function save(){
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

            }
        };
        xhttp.open("POST", "/home/saveList", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(self.constructDTO()));
    }

	function indexOfItem(value){
		for (var i = 0; i < items.length; i++){
			if (items[i].text == value){
				return i;
			}
		}

        return null;
	}

    function isShow(item){
        return item.isDeleted == 0;
    }
};
/*** Model end ***/

