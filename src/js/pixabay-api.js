import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const BASE_URL = 'https://pixabay.com/api/';
const ApiKey = '54217574-1b59999edbea9c550fa507ae7';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get('', {
    params: {
      key: ApiKey,
      q: query,
      page,
      per_page: PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  })
  return response.data;

}

export async function fetchImages() {
  return await fetch(`${BASE_URL}?key=${ApiKey}&q=random&image_type=photo`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.hits);
}