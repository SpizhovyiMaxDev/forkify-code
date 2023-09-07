import * as model from './model.js'
import recipeView from './views/recipeView.js';
import seaechView from './views/seaechView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import renderShoppingPagination from './views/paginationShoppigView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import ingredientsView from './views/ingredientsView.js';
import renderRecepiesView from './views/renderRecepiesView.js'
import { MODAL_CLOSE_SEC } from './config.js';
import removeIngredient from './views/removeIngredientView.js';
// import { sort } from 'core-js/core/array';
// import SortRecepies from './views/sortSearchViewResults.js';

// import 'core-js/stable';
// import 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept();
// }


async function controlRecipes(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpiner();

    // 0) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
  
    // 1)Updating the bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe;
    await model.loadRecipe(id);

    // 3) Rendering recepie;
    recipeView.render(model.state.recipe);


    console.log(model.state.recipe)

  } catch(err){
      recipeView.renderError();
  }
} 

async function controlSearchResults(){
  try{
    // 1) Get search query
    const query = seaechView.getQuery();
    if(!query)return;
    resultsView.renderSpiner();

    // 2)  Load results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results); -> all the results
    resultsView.render(model.getSearchResultsPage());
     
    // 4) Render pagination buttons
    paginationView.render(model.state.search);
  } catch(err){
     console.log(err);
  }
}  

function controlPagination(goToPage){
    // 3) Render results
    resultsView.render(model.getSearchResultsPage(goToPage));
     
    // 4) Render pagination buttons
    paginationView.render(model.state.search);
}


function controlServings(newServings){
  // Update the recepie servings
  model.updateServings(newServings)

  // Update the recepie view
  recipeView.update(model.state.recipe);
}

function controlAddBookmark(){
  // 1) Add || remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  
  //3) Render bookmarks on the bookmark table
  bookmarksView.render(model.state.bookmarks); 
}


function controlBookmarks(){
  bookmarksView.render(model.state.bookmarks);
}


const controlAddRecipe = async function (newRecipe) {
  try {
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);
    
    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);


    // Change ID in the Url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.poushState() => allow us to change the Url without reloading the page 
    // state/title/url
    

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

// async function sortRecepies(newRecepies){
//    console.log(newRecepies);
// }

function addRecipes(){
      const list = model.state.shoppingList;
      const ingredients = model.state.recipe.ingredients;

      //1) Create ingredients
      model.setIngredients(ingredients, list);

      //2) Render ingredients to view
      renderRecepiesView.render(model.getShoppingResultsPerPage());

      //3) Render pagination buttons
      renderShoppingPagination.render(model.state);
}

function controlShoppingView(){
      if(model.state.shoppingList.length !== 0){  
          //1) Render ingredients to view
          renderRecepiesView.render(model.getShoppingResultsPerPage());

          //2) Render pagination buttons
          renderShoppingPagination.render(model.state);
      }else {
        renderRecepiesView.renderMessage()
      }
}

function controlShoppingPagination(pageNum){
    //1) Render new page to the shoppig list 
    renderRecepiesView.render(model.getShoppingResultsPerPage(pageNum));

    //2) Render a new pagination to the new render list
    renderShoppingPagination.render(model.state);
}

function removeShoppingIngredient(name) {
    // 1) Remove the element from the shopping list;
    model.recreateShoppingList(name);

    // 2) Re-Render ingredients to view
    if(model.getShoppingResultsPerPage().length !== 0 && model.state.shoppingList.length !== 0){
         renderRecepiesView.render(model.getShoppingResultsPerPage());
    }else if(model.state.shoppingList.length !== 0){
        renderRecepiesView.render(model.getShoppingResultsPerPage(1));
    }else{
        renderRecepiesView.renderMessage()
    }
    
    //3) Render a new pagination to the new render list
    renderShoppingPagination.render(model.state);
}


function removeIngredients(){
  //1) remove all ingredients
  model.removeAllIngredients();

  //2) render a message to the user view
  renderRecepiesView.renderMessage();

  //3) rerender pagination
  renderShoppingPagination.render(model.state);
}



function init(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  seaechView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  renderRecepiesView.addHandlerRender(controlShoppingView);
  renderShoppingPagination.addHandlerClick(controlShoppingPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe);
  recipeView.addHandlerRenderRecipes(addRecipes);
  removeIngredient.addHandlerRemoveIngredient(removeShoppingIngredient);
  removeIngredient.addHandlerRemoveIngredients(removeIngredients);
    // SortRecepies.addHandlerSortViewResults(sortRecepies)
}

init();

// Every single note in the DOM Tree is the type of the node -> text type, element type, coment type, document type..

