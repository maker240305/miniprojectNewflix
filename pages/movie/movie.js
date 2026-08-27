const movieId = new URLSearchParams(window.location.search).get('id');
const reviewForm = document.getElementById('review-form');
const reviewMessage = document.getElementById('review-message');

function starsFromRating(rating) {
  const filledStars = Math.round(Number(rating));
  return '★'.repeat(filledStars) + '☆'.repeat(5 - filledStars);
}

function showMovie(movie) {
  document.title = `${movie.title} - 넷플릭스`;
  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-year').textContent = movie.release_year;
  document.getElementById('movie-rating').textContent = movie.age_rating || '등급 정보 없음';
  document.getElementById('movie-duration').textContent = movie.duration_text || '';
  document.getElementById('movie-description').textContent = movie.description;
  document.getElementById('movie-type').textContent = movie.content_type === 'movie' ? '영화' : '드라마';
  document.getElementById('movie-genre').textContent = movie.genre || '정보 없음';
  document.getElementById('movie-cast').textContent = movie.cast_members || '정보 없음';
  document.getElementById('average-stars').textContent = starsFromRating(movie.average_rating);
  document.getElementById('average-rating').textContent = `${movie.average_rating} / 5.0`;
  document.getElementById('review-count').textContent = `${movie.review_count}개의 한줄평`;
}

function showReviews(reviews) {
  const reviewList = document.getElementById('review-list');
  reviewList.replaceChildren();

  if (reviews.length === 0) {
    reviewList.textContent = '첫 번째 한줄평을 남겨 주세요.';
    return;
  }

  reviews.forEach((review) => {
    const item = document.createElement('article');
    const rating = document.createElement('strong');
    const comment = document.createElement('p');
    const date = document.createElement('small');

    rating.className = 'stars';
    rating.textContent = starsFromRating(review.rating);
    comment.textContent = review.comment;
    date.textContent = new Date(review.created_at).toLocaleDateString('ko-KR');
    item.append(rating, comment, date);
    reviewList.append(item);
  });
}

async function loadMovie() {
  if (!movieId) {
    throw new Error('영화 ID가 없습니다.');
  }

  const response = await fetch(`/api/movies/${movieId}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || '영화 정보를 불러오지 못했습니다.');

  showMovie(data.movie);
  showReviews(data.reviews);
}

reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  reviewMessage.textContent = '';

  try {
    const formData = new FormData(reviewForm);
    const response = await fetch(`/api/movies/${movieId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating: Number(formData.get('rating')),
        comment: formData.get('comment'),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || '한줄평을 저장하지 못했습니다.');

    reviewForm.reset();
    reviewMessage.textContent = '한줄평이 등록되었습니다.';
    await loadMovie();
  } catch (error) {
    reviewMessage.textContent = error.message;
  }
});

loadMovie().catch((error) => {
  document.getElementById('movie-title').textContent = error.message;
});
