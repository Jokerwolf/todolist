/**
 * Created by jokerwolf on 20/09/15.
 */

function SidePanelViewModel(model){
    var self = this;

    var model = model;
    var initState = saveInitState();

    this.changeCollapsedState = function(){
        var state = model.getPanelState();

        var sidePanel = document.getElementById('sidePanel');
        var mainArea = document.getElementById('mainArea');
        var collapseButton = document.getElementById('collapseButton');

        if (state === 'open'){
            //Collapse
            sidePanel.style.margin = '0 0 0 -14.5%';
            mainArea.style.width = '97%';

            collapseButton.classList.remove('glyphicon-arrow-left');
            collapseButton.classList.add('glyphicon-arrow-right')
        } else {
            //Return initState
            sidePanel.style.margin = initState['sidePanel'];
            mainArea.style.width = initState['mainArea'];

            collapseButton.classList.remove('glyphicon-arrow-right');
            collapseButton.classList.add('glyphicon-arrow-left')
        }
        model.inverseState();
    }

    function saveInitState(){
        var sidePanel = document.getElementById('sidePanel');
        var mainArea = document.getElementById('mainArea');

        return { sidePanel: sidePanel.style.margin, mainArea: mainArea.style.width };
    }
}