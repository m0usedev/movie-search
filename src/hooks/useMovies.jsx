import { useState, useEffect } from "react"
import { useDebounce } from "@uidotdev/usehooks";

import useInfiniteScroll from "./useInfiniteScroll";

import { fetchMovies, sortMovies } from "../functions/movies-functions";

const initialPageNumber = 1

export default function useMovies({ title, firstYear, secondYear, order }) {
  const [movies, setMovies] = useState(null) //array de peliculas
  const [lastTitle, setLastTitle] = useState(null) //controlamos la ultia version de datos pasados
  const debouncedSeach = useDebounce([ title, firstYear, secondYear ], 600) //esperamos a aque pase un tiempo antes de coger los datos

  const { scrollPage, setScrollPage, loading, setLoading, errorSearch, setErrorSearch } = useInfiniteScroll({ initialPageNumber })

  useEffect(() => {
    if(!lastTitle){
      setLastTitle([ title, firstYear, secondYear ])
    }
    if (debouncedSeach) {
      if (lastTitle && 
          (lastTitle[0] != debouncedSeach[0] ||
          lastTitle[1] != debouncedSeach[1] ||
          lastTitle[2] != debouncedSeach[2])) {
        setMovies(null)
        setLastTitle([ title, firstYear, secondYear ])
        setScrollPage(initialPageNumber)
        setLoading(true)
      }
    }
  }, [debouncedSeach])

  useEffect(() => {
    if (loading) {
      let newMovies = structuredClone(movies)

      fetchMovies(debouncedSeach[0], debouncedSeach[1], debouncedSeach[2], scrollPage)
        .then((data) => {
          if (data && !data.null) {
            movies ? newMovies.push(...data) : newMovies = data
            setMovies(reorderMovies(newMovies))
            setLoading(false)
            setErrorSearch(false)
            reorderMovies()
          } else {
            setErrorSearch(false)
            setLoading(false)
          }
        })
        .catch(() => {
          setErrorSearch(true)
          setLoading(false)
        });
    }
  }, [loading])

  useEffect(() => {
    setMovies(reorderMovies(movies))
  }, [order])

  const reorderMovies = (moviesArray) => {
    if(order){
      return sortMovies(moviesArray, order[0], order[1])
    }
    return moviesArray
  }

  return { movies, reorderMovies, loading, errorSearch }
}