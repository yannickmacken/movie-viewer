import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import useCounter from './hooks/use-counter'

function App() {

  // Set states for movielist, loading, error
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Define function to get movie list from api,
  // wrapped in useCallback, since it is a dependency of useEffect so shouldn't 
  // be recreated on every component render.
  const fetchMoviesHandler = useCallback(async () => {
    try{
      setIsLoading(true)
      setError(null)
      const response = await fetch('https://swapi.dev/api/films')
      
      if (!response.ok) {
        console.log(response)
        throw new Error("Bad response.")
      }
      
      const result = await response.json()
      const movieObjects = result.results.map(movieData => {
        return {
          key:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
        }
      })
      setMovieList(movieObjects)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  // Get count
  const countForwards = useCounter()
  const countBackwards = useCounter(false)


  
  // Run fetch movies function on initial component loading
  useEffect(() => {fetchMoviesHandler()}, [fetchMoviesHandler])

  return (
    <>
      <section>
        <Button variant="contained" onClick={fetchMoviesHandler}>Fetch Movies</Button>
        <br/>
        <h3>count: {countForwards}</h3>
        <h3>count: {countBackwards}</h3>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movieList}/>}
        {isLoading && 
          <div>
            <Skeleton variant="rectangular" width={'100%'} height={200} /> 
          </div>
        }
        {!isLoading && error && <p>{error}</p>}
      </section>
    </>
  );
}

export default App;
