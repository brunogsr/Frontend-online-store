export async function getCategories() {
  const requestCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await requestCategories.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const BASE_URL = 'https://api.mercadolibre.com/items/';
  const objParam = await fetch(`${BASE_URL}${id}`);
  const objParamJson = await objParam.json();
  // console.log(objParamJson);
  return objParamJson;
}
