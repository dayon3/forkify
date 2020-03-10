import axios from 'axios';

async function getResults(query) {
	const key = 'd5f0dbcef7914b76b5454c29d273e4a3';
	try {
		const res = await axios(
			`https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${query}`
		);
		const recipes = res.data.results;
		console.log(recipes);
	} catch (error) {
		alert(error);
	}
}
getResults('tomato pasta');

// d5f0dbcef7914b76b5454c29d273e4a3
// https://api.spoonacular.com/recipes/search
