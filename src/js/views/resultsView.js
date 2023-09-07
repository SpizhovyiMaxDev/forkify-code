import View from "./View";
import PreviewView from "./previewView";
// import icons from '../img/icons.svg'; // Parcel 1
import icons from '../../img/icons.svg'; // Parcel 2

class ResultsView extends View{
   _parentElement = document.querySelector('.results');
   _errorMessage = 'No recepies found for your query';
   _message = '';


   _generateMarkup(){
    return this._data.map(bookmark => PreviewView.render(bookmark, false)).join('');
   }
}


export default new ResultsView();