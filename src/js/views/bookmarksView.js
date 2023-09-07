import PreviewView from "./previewView";
import View from "./View";
// import icons from '../img/icons.svg'; // Parcel 1
import icons from '../../img/icons.svg'; // Parcel 2

class BookmarksView extends View{
   _parentElement = document.querySelector('.bookmarks__list');
   _errorMessage = 'No bookmarks yet. Find a recipe and bookmark it!';
   _message = '';

   addHandlerRender(handler){
      window.addEventListener('load', handler);
   }

   _generateMarkup(){
    return this._data.map(bookmark => PreviewView.render(bookmark, false)).join('');
   }   
}


export default new BookmarksView();

