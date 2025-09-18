import 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe = state.bookmarks.find(rec => rec.id === id);
    } else {
      const data = await getJSON(`${API_URL}/${id}`);

      const { recipe } = data.data;
      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        ingredients: recipe.ingredients,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        // bookmarked: false,
      };
    }
  } catch (err) {
    console.error(`${err} 🔥🔥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.result = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        image: res.image_url,
        publisher: res.publisher,
      };
    });

    console.log(data);
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 🔥🔥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = this.state.search.page) {
  this.state.search.page = page;
  const start = (page - 1) * this.state.search.resultsPerPage; // 0
  const end = page * this.state.search.resultsPerPage; // 9

  return this.state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  this.state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / this.state.recipe.servings;
  });

  this.state.recipe.servings = newServings;
};

export const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  console.log(state.bookmarks);
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // Persist bookMark
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  console.log(state.bookmarks);
  // Delete bookmark
  const index = state.bookmarks.findIndex(rec => rec.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as Not bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // Persist bookMark
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();