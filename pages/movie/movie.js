// URL 쿼리 스트링 파싱
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// 예시 데이터베이스 (실제 프로젝트에서는 서버 API나 데이터 파일 사용)
const movieData = {
  "1": {
    title: "대표 영화 제목 (영화 1)",
    year: "2026",
    rating: "15+",
    duration: "2시간 15분",
    description: "첫 번째 영화에 대한 상세한 소개 문구입니다. 넷플릭스 스타일의 클론 코딩 페이지에서 동적으로 데이터를 불러오고 있습니다."
  },
  "2": {
    title: "두 번째 영화",
    year: "2025",
    rating: "19+",
    duration: "1시간 50분",
    description: "두 번째 인기 콘텐츠 상세 설명입니다."
  },
  "3": {
    title: "세 번째 영화",
    year: "2024",
    rating: "ALL",
    duration: "1시간 30분",
    description: "세 번째 인기 콘텐츠 상세 설명입니다."
  },
  "4": {
    title: "네 번째 영화",
    year: "2026",
    rating: "12+",
    duration: "2시간 05분",
    description: "네 번째 인기 콘텐츠 상세 설명입니다."
  }
};

// DOM 요소 선택
const titleElement = document.getElementById('movie-title');
const yearElement = document.getElementById('movie-year');
const ratingElement = document.getElementById('movie-rating');
const durationElement = document.getElementById('movie-duration');
const descElement = document.getElementById('movie-description');

// 데이터 매칭 및 렌더링
if (movieId && movieData[movieId]) {
  const currentMovie = movieData[movieId];
  titleElement.textContent = currentMovie.title;
  yearElement.textContent = currentMovie.year;
  ratingElement.textContent = currentMovie.rating;
  durationElement.textContent = currentMovie.duration;
  descElement.textContent = currentMovie.description;
} else {
  titleElement.textContent = "영화를 찾을 수 없습니다.";
  descElement.textContent = "존재하지 않거나 잘못된 접근입니다.";
}