import { API_URL, RES_PER_PAGE, PRODUCTS_PER_PAGE, KEY } from "./config";
// import { getJSON, sendJSON } from "./helpers";
import { AJAX } from "./helpers";
 
export const state = {
    recipe:{}, 
    search:{
        query:'',
        results:[],
        resultsPerPage: RES_PER_PAGE,
        page:1,
    }, 
    bookmarks:[],
    shopping:{
        page:1,
        resultsPerPage:PRODUCTS_PER_PAGE,
        currentPage:1,
    },
    shoppingList:[],
}

function createRecipeObject(data){
    const {recipe} = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ingredientsNum:recipe.ingredients.length,
        ...(recipe.key && { key: recipe.key }),
    };
}

export async function loadRecipe(id){
    try{
       const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data);


        if(state.bookmarks.some(bookmark => bookmark.id === id)){
            state.recipe.bookmarked = true;
        }else{
            state.recipe.bookmarked = false;
        }

    } catch(err){
        throw err;
    }
}

export async function loadSearchResults(query){
    try{ 
        state.search.query = query;
        const {data} = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.page = 1;
        state.search.results = data.recipes.map(function(rec){
          return  {
              id:rec.id,
              title:rec.title,
              publisher:rec.publisher,
              image:rec.image_url,
              ...(rec.key && { key: rec.key }),
          }
        }
      );
    } catch(err){
        throw err;
    }
} 

export function getSearchResultsPage(page = state.search.page){
    const start = (page-1)*state.search.resultsPerPage;
    const end = page*state.search.resultsPerPage;

    state.search.page = page;

   return state.search.results.slice(start, end);
}


export function getShoppingResultsPerPage(page = state.shopping.page){
     const start = (page-1)*state.shopping.resultsPerPage;
     const end = page*state.shopping.resultsPerPage;

     state.shopping.page = page;

     return state.shoppingList.slice(start, end);
}

export function createBtnRemoveSign(){
    state.shoppingList.map((ing, i) => ing.dataNum = i);
}

export function recreateShoppingList(name){
   const index = state.shoppingList.findIndex(el => el.description === name);
    state.shoppingList.splice(index, 1);
    persistShopping();
}

export function updateServings(newServings){
     state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
        // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
     });

     state.recipe.servings = newServings;
}


export function setIngredients(ingredients, list){
      ingredients.map(ing=> list.every(ingredient => ingredient.description !== ing.description) ?  list.push(ing) : ing);
      persistShopping(); 
}

export function removeAllIngredients(){
    state.shoppingList.length = 0;
    persistShopping();
}

export function addBookmark(recipe){
    state.bookmarks.push(recipe);

    // Mark current recepie as a bookmarked
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
}

export function deleteBookmark(id){
    // Delete (current) bookmark
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recepie as not bookmarked
    if(state.recipe.id === id) state.recipe.bookmarked = false;
    persistBookmarks(); 
}

function persistBookmarks(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

 function persistShopping(){
    localStorage.setItem('shoppings', JSON.stringify(state.shoppingList))
}

function init(){
  const storageBookmarks = localStorage.getItem('bookmarks');
    if(storageBookmarks)
        state.bookmarks = JSON.parse(storageBookmarks);

    const storageShoppings = localStorage.getItem('shoppings');
    if(storageShoppings)
        state.shoppingList = JSON.parse(storageShoppings);
}

init();

export async function uploadRecipe(newRecipe){
    try{
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing =>{
            const ingArr =  ing[1].replaceAll(' ', '').split(',');

            if(ingArr.length!==3)
                throw new Error('Wrong Ingredient format! Please use the correct format :)');

            const [quantity, unit, description] = ingArr;
            return {quantity: quantity ? +quantity : null, unit, description};
        })

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };

      const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
      
      state.recipe = createRecipeObject(data);
      addBookmark(state.recipe);
    } catch(err){
        throw err
    }
}


