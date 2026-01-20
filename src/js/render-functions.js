import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,     
});

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images.map(image => `
    <li class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      </a>
      <div class="info">
  <p class="info-item">
    <span class="label">Likes</span>
    <span class="value">${image.likes}</span>
  </p>
  <p class="info-item">
    <span class="label">Views</span>
    <span class="value">${image.views}</span>
  </p>
  <p class="info-item">
    <span class="label">Comments</span>
    <span class="value">${image.comments}</span>
  </p>
  <p class="info-item">
    <span class="label">Downloads</span>
    <span class="value">${image.downloads}</span>
  </p>
</div>
    </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup)

  lightbox.refresh();
}

const gallery = document.querySelector('.gallery');

export function clearGallery() {
  gallery.innerHTML = '';
}


export function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}

export function showLoadMoreButton() {
  document.querySelector('.buttonload').classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  document.querySelector('.buttonload').classList.add('is-hidden');
}
