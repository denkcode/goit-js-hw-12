import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {
  hideLoadMoreButton,
  showLoadMoreButton,
  showLoader,
  hideLoader,
  clearGallery,
  createGallery
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadmoreBtn = document.querySelector('.buttonload');

let currentQuery = '';
let page = 1;
let totalHits = 0;
let shownImages = 0;


hideLoadMoreButton();


loadmoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);
    shownImages += data.hits.length;
    const gallery = document.querySelector('.gallery');
    const card = gallery.firstElementChild;  // перша картка

    if (card) {
    const height = card.getBoundingClientRect().height;

    window.scrollBy({
        top: height * 2,
        behavior: 'smooth'
    });
    }



    if (shownImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: 'Більше зображень немає.' });
    }

  } catch {
    iziToast.error({ message: 'Помилка завантаження' });
  } finally {
    hideLoader();
  }
});

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = event.currentTarget.searchtext.value.trim();

  if (query === '') {
    iziToast.warning({ message: 'Введіть слово для пошуку!' });
    return;
  }

  currentQuery = query;
  page = 1;
  shownImages = 0;

  clearGallery();
  showLoader();


  hideLoadMoreButton()

  try {
    const data = await getImagesByQuery(query);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      hideLoader();
      iziToast.warning({ message: 'Нічого не знайдено. Спробуйте інший запит.' });
      return;
    }

    setTimeout(() => {
      createGallery(data.hits);
      hideLoader();

      iziToast.success({ message: `Знайдено ${totalHits} зображень` });

      shownImages = data.hits.length

      if (shownImages < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    }, 2000);

  } catch (error) {
    hideLoader();
    iziToast.error({ message: 'Помилка сервера. Спробуйте пізніше' });
  }

  searchForm.reset();
});
