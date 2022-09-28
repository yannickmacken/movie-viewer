import React from 'react';
import { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

function App() {

  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function fetchMoviesHandler() {
    setIsLoading(true)
    const response = await fetch('https://swapi.dev/api/films')
    const result = await response.json()
    const movieObjects = result.results.map(movieData => {
      return {
        key:movieData.episode_id,
        title:movieData.title,
        openingText:movieData.opening_crawl,
      }
    })
    setMovieList(movieObjects)
    setIsLoading(false)
  }

  return (
    <>
      <section>
        <Button variant="contained" onClick={fetchMoviesHandler}>Fetch Movies</Button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movieList}/>}
        {isLoading && 
          <div>
            <Skeleton variant="rectangular" width={'100%'} height={200} /> 
          </div>
        }
      </section>
    </>
  );
}

export default App;
