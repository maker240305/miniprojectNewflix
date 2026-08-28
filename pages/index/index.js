const movieList = document.getElementById('movie-list');
const featuredTitle = document.getElementById('featured-title');
const featuredDescription = document.getElementById('featured-description');
const featuredLink = document.getElementById('featured-link');
const featuredPlay = document.getElementById('featured-play');
const hero = document.getElementById('home');
const profileButton = document.getElementById('profile-button');
const profileMenu = document.getElementById('profile-menu');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const myListLink = document.getElementById('my-list-link');
const myListSection = document.getElementById('my-list');
const myListMovies = document.getElementById('my-list-movies');
const myListEmpty = document.getElementById('my-list-empty');
const myListStorageKey = 'newflixMyList';
let allMovies = [];

async function loadMovies() {
  try {
    const response = await fetch('/api/movies');
    if (!response.ok) throw new Error('영화 목록을 불러오지 못했습니다.');

    allMovies = await response.json();
    renderFeaturedMovie(allMovies[0]);
    renderMovieCards(allMovies);
  } catch (error) {
    featuredTitle.textContent = '영화를 불러오지 못했습니다.';
    featuredDescription.textContent = '서버가 실행 중인지 확인해 주세요.';
    movieList.textContent = error.message;
  }
}

function renderFeaturedMovie(movie) {
  if (!movie) {
    featuredTitle.textContent = '등록된 영화가 없습니다.';
    return;
  }

  featuredTitle.textContent = movie.title;
  featuredDescription.textContent = movie.description || `${movie.release_year} · ${movie.genre || movie.content_type}`;
  featuredLink.href = `/movie?id=${movie.id}`;
  featuredPlay.href = movie.trailer_url || '#';
  featuredPlay.toggleAttribute('hidden', !movie.trailer_url);

  if (movie.background_url) {
    const safeBackgroundUrl = movie.background_url.replaceAll('"', '%22');
    hero.style.setProperty('--hero-image', `url("${safeBackgroundUrl}")`);
  }
}

profileButton.addEventListener('click', () => {
  const isOpen = profileMenu.hidden;
  profileMenu.hidden = !isOpen;
  profileButton.setAttribute('aria-expanded', String(isOpen));
});

function renderMovieCards(movies) {
  movieList.replaceChildren();
  movies.forEach((movie) => {
    movieList.append(createMovieCard(movie));
  });

  updateCarouselButtons();
}

function createMovieCard(movie) {
  const card = document.createElement('a');
  const image = document.createElement('img');
  const title = document.createElement('span');

  card.className = 'movie-card';
  card.href = `/movie?id=${movie.id}`;
  image.src = movie.background_url || movie.poster_url || '';
  image.alt = `${movie.title} 썸네일`;
  image.loading = 'lazy';
  image.addEventListener('error', () => image.remove());
  title.className = 'movie-card-title';
  title.textContent = `${movie.title} · ${movie.average_rating}★`;
  card.append(image, title);
  return card;
}

function getSavedMovieIds() {
  try {
    const savedIds = JSON.parse(localStorage.getItem(myListStorageKey) || '[]');
    return Array.isArray(savedIds) ? savedIds.map(Number).filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

function showMyList() {
  const savedIds = getSavedMovieIds();
  const savedMovies = allMovies.filter((movie) => savedIds.includes(Number(movie.id)));

  myListMovies.replaceChildren(...savedMovies.map(createMovieCard));
  myListEmpty.hidden = savedMovies.length > 0;
  myListSection.hidden = false;
  myListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function moveCarousel(direction) {
  const card = movieList.querySelector('.movie-card');
  const gap = 12;
  const distance = card ? (card.offsetWidth + gap) * 2 : movieList.clientWidth * 0.8;
  movieList.scrollBy({ left: direction * distance, behavior: 'smooth' });
}

function updateCarouselButtons() {
  const maxScrollLeft = movieList.scrollWidth - movieList.clientWidth;
  carouselPrev.hidden = movieList.scrollLeft <= 2;
  carouselNext.hidden = maxScrollLeft <= 2 || movieList.scrollLeft >= maxScrollLeft - 2;
}

carouselPrev.addEventListener('click', () => moveCarousel(-1));
carouselNext.addEventListener('click', () => moveCarousel(1));
movieList.addEventListener('scroll', updateCarouselButtons);
window.addEventListener('resize', updateCarouselButtons);
myListLink.addEventListener('click', (event) => {
  event.preventDefault();
  showMyList();
});

loadMovies();
