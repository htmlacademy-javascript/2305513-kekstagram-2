import { debounce } from './util.js';
import { render } from './posts.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;
const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

let originalPhotos = [];
let currentFilter = 'default';

const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

const getDefaultPhotos = () => originalPhotos;
const getRandomPhotos = () => {
  const shuffled = [...originalPhotos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = () =>
  [...originalPhotos].sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = debounce((photos) => {
  document.querySelectorAll('.picture').forEach(img => img.remove());

  render(photos);
}, DEBOUNCE_DELAY);

const onFilterChange = (evt) => {
  const clickedButton = evt.target;
  if (!clickedButton.matches('.img-filters__button')) return;

  filterButtons.forEach(btn => btn.classList.remove('img-filters__button--active'));
  clickedButton.classList.add('img-filters__button--active');

  currentFilter = clickedButton.id.replace('filter-', '');

  switch (currentFilter) {
    case 'random':
      applyFilter(getRandomPhotos());
      break;
    case 'discussed':
      applyFilter(getDiscussedPhotos());
      break;
    default:
      applyFilter(getDefaultPhotos());
  }
};

const initFilters = (photos) => {
  originalPhotos = photos;
  showFilters();
  filtersContainer.addEventListener('click', onFilterChange);
};

export { initFilters };
