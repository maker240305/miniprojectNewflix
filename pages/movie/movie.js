// 영화 상세 정보, 별점, 한줄평/평론 기능을 이 파일에서 연결합니다.
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

console.log('movie id:', movieId);
