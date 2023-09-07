import icons from '../../img/icons.svg';
import View from './View';

class AddRecipeView extends View {
    _message = 'Recipe was successfuly uploaded!';
    _parentElement = document.querySelector('.upload');

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');    
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnHide = document.querySelector('.btn--close-modal');       
    
    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }

    _addHandlerHideWindow(){
        this._btnHide.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerUpload(handler){
      this._parentElement.addEventListener('submit', function(e){
        e.preventDefault();
        const dataArr = [...new FormData(this)];
        const data = Object.fromEntries(dataArr);
        handler(data);
      })  
    }
}

export default new AddRecipeView();