import 'regenerator-runtime/runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function(id) {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // console.log(res, data);

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
    alert(err);
  }
};