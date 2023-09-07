import View from "./View";
import PlatformView from './platformView'

class RenderRecepiesView extends View{
    _parentElement = document.querySelector('.ingredients-list');
    _message = 'Add an ingredients from the recipes ;)'


     addHandlerRender(handler){
        window.addEventListener('load', handler)
     }

    _generateMarkup(){
      return this._data.map(ing => PlatformView.render(ing, false)).join('');
    }
}


export default new RenderRecepiesView();