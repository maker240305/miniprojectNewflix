CREATE TABLE movies (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  content_type VARCHAR(10) NOT NULL CHECK (content_type IN ('movie', 'drama')),
  release_year INTEGER NOT NULL CHECK (release_year BETWEEN 1888 AND 2100),
  age_rating VARCHAR(20),
  duration_text VARCHAR(50),
  description TEXT NOT NULL,
  genre VARCHAR(160),
  cast_members VARCHAR(255),
  poster_url TEXT,
  background_url TEXT,
  trailer_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reviews (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment VARCHAR(300) NOT NULL CHECK (char_length(trim(comment)) BETWEEN 1 AND 300),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX reviews_movie_id_created_at_idx ON reviews (movie_id, created_at DESC);
