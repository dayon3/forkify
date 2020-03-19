import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shooping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
	// 1) Get query from view
	const query = searchView.getInput(); //TODO

	if (query) {
		// 2) New search object and add to state
		state.search = new Search(query);

		// 3) Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		try {
			// 4) Search for recipes
			await state.search.getResults();

			// 5) Render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (error) {
			alert('Something wrong with the search...');
			clearLoader();
		}
	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
	const btn = event.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
	// Get ID from URL
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		// Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		// Highlight selected search item
		if (state.search) searchView.highlightSelected(id);

		// Create new recipe object
		state.recipe = new Recipe(id);

		try {
			// Get recipe data
			await state.recipe.getRecipe();

			// Calculate servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();

			// Render recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe);
		} catch (error) {
			alert('Error rendering recipe!');
		}
	}
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event =>
	window.addEventListener(event, controlRecipe)
);
