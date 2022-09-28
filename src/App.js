import React from 'react';
import { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Button from '@mui/material/Button';

function App() {

  const [movieList, setMovieList] = useState([])

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films').then(response => {
      return response.json().then(data => {
        const movieObjects = data.results.map(movieData => {
          return {
            key:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
          }
        })
        setMovieList(movieObjects)
      })
    })
  }

  return (
    <>
      <section>
        <Button variant="contained" onClick={fetchMoviesHandler}>Fetch Movies</Button>
      </section>
      <section>
        <MoviesList movies={movieList} />
      </section>
    </>
  );
}

export default App;
