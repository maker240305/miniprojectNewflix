const movieList = document.getElementById('movie-list');
const featuredTitle = document.getElementById('featured-title');
const featuredDescription = document.getElementById('featured-description');
const featuredLink = document.getElementById('featured-link');

async function loadMovies() {
  try {
    const response = await fetch('/api/movies');
    if (!response.ok) throw new Error('영화 목록을 불러오지 못했습니다.');

    const movies = await response.json();
    renderFeaturedMovie(movies[0]);
    renderMovieCards(movies);
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
  featuredDescription.textContent = `${movie.release_year} · ${movie.genre || movie.content_type}`;
  featuredLink.href = `/movie?id=${movie.id}`;
}

function renderMovieCards(movies) {
  movieList.replaceChildren();
  movies.forEach((movie) => {
    const card = document.createElement('a');
    card.className = 'movie-card';
    card.href = `/movie?id=${movie.id}`;
    card.textContent = `${movie.title} (${movie.average_rating}★)`;
    movieList.append(card);
  });
}

loadMovies();
