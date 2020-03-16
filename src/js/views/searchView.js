import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	elements.searchResList.innerHTML = '';
};

/**
 * 'Pasta with tomato and spinach'
 * acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
 * acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
 * acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
 * acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
 * acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
 */

const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((accumulator, current) => {
			if (accumulator + current.length <= limit) {
				newTitle.push(current);
			}
			return accumulator + current.length;
		}, 0);

		// return result
		return `${newTitle.join(' ')} ...`;
	}
	return title;
};

const renderRecipe = recipe => {
	const markup = `
    <li>
      <a class="results__link" href="${recipe.id}">
        <figure class="results__fig">
          <img src="https://spoonacular.com/recipeImages/${
						recipe.id
					}-312x231.jpg" alt="Test">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">Ready in ${
						recipe.readyInMinutes
					} minutes.</p>
        </div>
      </a>
    </li>
  `;

	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
	recipes.forEach(renderRecipe);
};
