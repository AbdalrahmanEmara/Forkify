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
};

export const loadRecipe = async function (id) {
  try {
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
    };
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