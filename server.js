require('dotenv').config();

const express = require('express');
const path = require('path');
const { pool } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index', 'index.html'));
});

app.get('/movie', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'movie', 'movie.html'));
});

app.get('/api/movies', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT movies.id, movies.title, movies.content_type, movies.release_year,
        movies.age_rating, movies.duration_text, movies.genre, movies.poster_url,
        COALESCE(ROUND(AVG(reviews.rating)::numeric, 1), 0) AS average_rating,
        COUNT(reviews.id)::integer AS review_count
      FROM movies
      LEFT JOIN reviews ON reviews.movie_id = movies.id
      GROUP BY movies.id
      ORDER BY movies.id;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('영화 목록 조회 실패:', error);
    res.status(500).json({ message: '영화 목록을 불러오지 못했습니다.' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  const movieId = Number(req.params.id);

  if (!Number.isInteger(movieId) || movieId < 1) {
    return res.status(400).json({ message: '올바른 영화 ID가 아닙니다.' });
  }

  try {
    const movieResult = await pool.query(
      `SELECT movies.*, COALESCE(ROUND(AVG(reviews.rating)::numeric, 1), 0) AS average_rating,
        COUNT(reviews.id)::integer AS review_count
       FROM movies LEFT JOIN reviews ON reviews.movie_id = movies.id
       WHERE movies.id = $1 GROUP BY movies.id;`,
      [movieId]
    );

    if (movieResult.rowCount === 0) {
      return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
    }

    const reviewResult = await pool.query(
      `SELECT id, rating, comment, created_at FROM reviews
       WHERE movie_id = $1 ORDER BY created_at DESC, id DESC;`,
      [movieId]
    );

    res.json({ movie: movieResult.rows[0], reviews: reviewResult.rows });
  } catch (error) {
    console.error('영화 상세 조회 실패:', error);
    res.status(500).json({ message: '영화 정보를 불러오지 못했습니다.' });
  }
});

app.post('/api/movies/:id/reviews', async (req, res) => {
  const movieId = Number(req.params.id);
  const rating = Number(req.body.rating);
  const comment = typeof req.body.comment === 'string' ? req.body.comment.trim() : '';

  if (!Number.isInteger(movieId) || movieId < 1) {
    return res.status(400).json({ message: '올바른 영화 ID가 아닙니다.' });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ message: '별점은 1점부터 5점까지 선택하세요.' });
  }
  if (!comment || comment.length > 300) {
    return res.status(400).json({ message: '한줄평은 1~300자로 작성하세요.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO reviews (movie_id, rating, comment)
       SELECT $1, $2, $3 WHERE EXISTS (SELECT 1 FROM movies WHERE id = $1)
       RETURNING id, rating, comment, created_at;`,
      [movieId, rating, comment]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
    }
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('리뷰 등록 실패:', error);
    res.status(500).json({ message: '한줄평을 저장하지 못했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
