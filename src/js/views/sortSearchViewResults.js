import { state } from "../model";
import View from "./View";

class SortRecepies extends View{
    _parentElement = document.querySelector('.nav');
    _boolSort = false;

    addHandlerSortViewResults(handler){
       this._parentElement.addEventListener('click', function(e){
         const btn = e.target.closest('.nav__btn--sort-ingredients');
         if(!btn)return;
         handler(state.search.results);
       })
    }

}


export default new SortRecepies();