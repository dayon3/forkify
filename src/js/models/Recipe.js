import axios from 'axios';
import { key } from '../config';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(
				`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=false`
			);
			this.title = res.data.title;
			this.author = res.data.creditsText;
			this.img = res.data.image;
			this.url = res.data.sourceUrl;
			this.ingredients = res.data.extendedIngredients;
			this.servings = res.data.servings;
			this.time = res.data.readyInMinutes;
		} catch (error) {
			console.log(error);
			alert('Something went wrong!');
		}
	}

	calcTime() {
		// Assuming that we need 15 min for each 3 ingredients
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}

	calcServings() {
		this.servings = 4;
	}
}
