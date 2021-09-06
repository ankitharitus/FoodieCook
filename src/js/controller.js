import * as model from './model';
import recipeView from './Views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './Views/searchView';
import resultsView from './Views/resultsView';
import paginationView from './Views/paginationView';
import bookmarksView from './Views/bookmarksView';
import addRecipeView from './Views/addRecipeView';

const recipeContainer = document.querySelector('.recipe');

//spinner

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // resultsView.render(model.getSearchResultPerPage());
    bookmarksView.render(model.state.bookmarks);

    // 1.Loading Reciepe
    await model.loadRecipe(id);

    //2.Rendering recipe
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPerPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotopage) {
  resultsView.render(model.getSearchResultPerPage(gotopage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update servings
  model.updateServings(newServings);

  //New servings
  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //render recipe view
  recipeView.render(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    //change id in URL
    // window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addRenderHandler(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addClickHandler(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
