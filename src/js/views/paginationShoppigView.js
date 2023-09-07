import View from "./View";


class RenderShoppingPagination extends View{
    _parentElement = document.querySelector('.pagination-shopping');


    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn)return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkup(){
        const currentPage = this._data.shopping.page;
        const numPages = Math.ceil(this._data.shoppingList.length / this._data.shopping.resultsPerPage);
        // Page 1, there are other pages        
        if(currentPage === 1 && numPages > 1){
           return ` 
           <div class = "pagination--pages__info">  ${currentPage} / ${numPages}</div> 
           ${this._generateMarkupButtonNext(currentPage)}
           `
        }
        // Page 1, and there are no pages
        // Last page

        if(currentPage === numPages && numPages > 1){
          return `
          ${this._generateMarkupButtonPrevious(currentPage)}
           <div class = "pagination--pages__info">  ${currentPage} / ${numPages}</div> 
          `
        }

        // Other page
       if(currentPage < numPages){
            return `
            ${this._generateMarkupButtonPrevious(currentPage)}
            <div class = "pagination--pages__info">  ${currentPage} / ${numPages}</div> 
            ${this._generateMarkupButtonNext(currentPage)}
            `
       }
        
       if(numPages === 1){
        return `<div class = "pagination--pages__info"> 1 / 1 </div>`;
       }

       return '';
    }
}


export default new RenderShoppingPagination();