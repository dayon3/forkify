import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		const key = 'd5f0dbcef7914b76b5454c29d273e4a3';
		const number = 30;
		try {
			const res = await axios(
				`https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}&number=${number}`
			);
			this.result = res.data.results;
			//console.log(this.result);
		} catch (error) {
			alert(error);
		}
	}
}
