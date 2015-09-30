/**
 * Created by jokerwolf on 30/09/15.
 */

function EditableControl(template, parent){
    var self = this;

    this.templateNode = template;
    this.parentNode = parent;

    this.render = function(text){
        self.templateNode.removeAttribute('id');
        self.templateNode.classList.remove('hidden');

        var displayControl = self.templateNode.querySelector('.item-text');
        var editControl = self.templateNode.querySelector('.item-edit');

        displayControl.innerHTML = text;
        editControl.value = text;

        parent.appendChild(control);
    }
}