/**
 * Created by jokerwolf on 20/09/15.
 */

function SidePanelViewModel(model){
    var self = this;

    var model = model;
    var initState = saveInitState();

    this.changeCollapsedState = function(){
        var state = model.getPanelState();
        if (state === 'open'){
            //Collapse
            sidePanel.style.margin = '0 0 0 -15%';
            mainArea.style.width = '98%';
        } else {
            //Return initState
            sidePanel.style.margin = initState['sidePanel'];
            mainArea.style.width = initState['mainArea'];
        }
        model.inverseState();
    }

    function saveInitState(){
        var sidePanel = document.getElementById('sidePanel');
        var mainArea = document.getElementById('mainArea');

        return { sidePanel: sidePanel.style.margin, mainArea: mainArea.style.width };
    }
}