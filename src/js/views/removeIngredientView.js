import View from "./View";

class removeIngredient extends View{
       _parentElement = document.querySelector('.ingredients');


       addHandlerRemoveIngredient(handler){
        const self = this;
          this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--remove_item');
            if(!btn)return;
            const name = btn.dataset.name;
            handler(name);
          });
       }

       addHandlerRemoveIngredients(handler){
            this._parentElement.addEventListener('click', function(e){
              const btn = e.target.closest('.btn--remove__ingredients');
              if(!btn)return;
              handler(btn);
            })
       }
}



export default new removeIngredient();