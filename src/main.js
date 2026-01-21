import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  hideLoadMoreButton,
  showLoadMoreButton,
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadmoreBtn = document.querySelector('.buttonload');

let currentQuery = '';
let page = 1;
let totalHits = 0;
let shownImages = 0;

hideLoadMoreButton();

/* ---------- LOAD MORE ---------- */
loadmoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton(); // ховаємо кнопку під час fetch

  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);
    shownImages += data.hits.length;

    const gallery = document.querySelector('.gallery');
    const card = gallery.firstElementChild;

    if (card) {
      const height = card.getBoundingClientRect().height;
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    if (shownImages < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({ message: 'Більше зображень немає.' });
    }
  } catch {
    iziToast.error({ message: 'Помилка завантаження' });
  } finally {
    hideLoader();
  }
});

/* ---------- SEARCH ---------- */
searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.currentTarget.searchtext.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Введіть слово для пошуку!' });
    return;
  }

  currentQuery = query;
  page = 1;
  shownImages = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        message: 'Нічого не знайдено. Спробуйте інший запит.',
      });
      return;
    }

    createGallery(data.hits);

    iziToast.success({
      message: `Знайдено ${totalHits} зображень`,
    });

    shownImages = data.hits.length;

    if (shownImages < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({ message: 'Більше зображень немає.' });
    }
  } catch {
    iziToast.error({
      message: 'Помилка сервера. Спробуйте пізніше',
    });
  } finally {
    hideLoader();
  }

  searchForm.reset();
});
