import axios from 'axios';
import { createObject } from './createobject';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const serchEl = document.querySelector('button[type="submit"]');
const btnElLoadMore = document.querySelector('.load-more');
const inputEl = document.querySelector('input[type="text"]');
const formSearchEl = document.getElementById('search-form');
const galerryEl = document.querySelector('.gallery');

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '35854690-4159d3cc03f107c66dd11036d';
btnElLoadMore.style.visibility = 'hidden';

let page = 1;
let imagesPerPage = 40;

const fechPhotos = async () => {
  const objects = await axios
    .get(API_URL, {
      params: {
        key: API_KEY,
        q: inputEl.value,
        image_type: 'photo',
        orintation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: imagesPerPage,
      },
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
  return objects;
};

const fechImages = () => {
  fechPhotos().then(res => {
    const hits = res.data.hits;
    console.log(hits);
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (hits.length < 40) {
      btnElLoadMore.style.visibility = 'hidden';
    }
    galerryEl.innerHTML = createObject(res);

    Notiflix.Notify.info(`Hooray! We found ${res.data.total} images.`);

    new simpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });

    // if (imagesPerPage > res.data.totalHits) {
    //   Notiflix.Notify.warning(
    //     "We're sorry, but you've reached the end of search results."
    //   );
    //   btnElLoadMore.style.visibility = 'hidden';
    // }
  });
};

const loadMore = async () => {
  return await fechPhotos().then(res => {
    galerryEl.insertAdjacentHTML('beforeend', createObject(res));
    new simpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });

    if (res.data.hits.length < 40) {
      btnElLoadMore.style.visibility = 'hidden';
    }
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  });
};

serchEl.addEventListener('click', ev => {
  btnElLoadMore.style.visibility = 'visible';
  ev.preventDefault();
  page = 1;
  fechImages();
  console.log(page);
});

btnElLoadMore.addEventListener('click', () => {
  page++;
  loadMore();
});
