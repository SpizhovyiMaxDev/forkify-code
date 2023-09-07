// import icons from '../img/icons.svg'; // Parcel 1
import icons from '../../img/icons.svg'; // Parcel 2
// .. - Parent folder('src' folder)

export default class View{
    _data;

    /**
     * @param {Object | Objects[]} data // The data to be rendered {e.g. recipe} 
     * @param {boolean} [render =  true] // if false, create markup string instead of rendering to the DOM
     * @return {undefined | string} // A markup string is return if render = false
     * @this {Object} View instance
     * @author Max Spizhovyi
     * @todo Finish implementation 
    */
        
    render(data, render = true){
        if(!data || (Array.isArray(data) && data.length===0))return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data){
        if (!data || (Array.isArray(data) && data.length===0))return this.renderError();
        this._data = data;
        const newMarkup = this._generateMarkup();

        // creating something like a virtual dom
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currentElements = Array.from(this._parentElement.querySelectorAll('*'));
        
        newElements.forEach((newEl, i) => {
             const curEl = currentElements[i];

             // Updates changet Textes
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
                curEl.textContent = newEl.textContent;
            }

            // Updates changed Attributes
            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach(attribute => curEl.setAttribute(attribute.name, attribute.value));
            }
        });
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpiner(){
        const markup = `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    renderError(message = this._errorMessage){
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }


    _generateMarkupButtonNext(curPage){
        return `
                <button data-goto = "${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                </button>
        `
    }

    _generateMarkupButtonPrevious(curPage){
        return `
            <button  data-goto = "${curPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
            <span>Page ${curPage - 1}</span>
            </button>
       `
    }
}