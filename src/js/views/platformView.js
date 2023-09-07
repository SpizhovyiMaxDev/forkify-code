import View from "./View";

class PlatformView extends View{
     _generateMarkup(){
            return `
            <li class = "ingredients--list__item">
              <p class = "ingredients--ingredient__description">
                 <span class = "ingredients-quantity">
                   ${this._data.quantity ? this._data.quantity : 1}
                </span>
               ${this._data.description}
              </p>

                <button class = "btn--remove_item" data-name = "${this._data.description}">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="icon-close" stroke-width="2" stroke="#f38e82">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                        </g>
                    </svg>
                </button>
            </li>
            `
     }
}


export default new PlatformView();