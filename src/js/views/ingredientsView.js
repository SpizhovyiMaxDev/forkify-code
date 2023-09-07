import View from "./View";

class IngredientsView extends View{
    _parentElement = document.querySelector('nav');
    _platform = document.querySelector('.ingredients');

    constructor(){
        super();
        this._controlViewList();
    }

    _controlViewList(){
        this._parentElement.addEventListener('click', this._toggleRecepiesView.bind(this))
    }

    _toggleRecepiesView(e){
        const btn = e.target.closest('.nav__btn--toggle-platform');
        if(!btn)return;
        this._platform.classList.toggle('ingredients-hidden');
    }
}

export default new IngredientsView();


/*
 When you call super() within the constructor of a child class, it sets up the this keyword for the child class, allowing you to access and modify properties specific to the child class, and it also invokes the constructor of the parent class to set up any properties and behavior defined in the parent class.
*/