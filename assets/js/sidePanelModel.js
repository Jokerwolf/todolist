/**
 * Created by jokerwolf on 20/09/15.
 */


function SidePanelModel(state){
    this.state = state == null ? 'open' : state;

    this.getPanelState = function(){
        return this.state;
    }

    this.inverseState = function(){
        if (this.state === 'open') {
            this.state = 'collapse';
        } else {
            this.state = 'open';
        }
    }
}
