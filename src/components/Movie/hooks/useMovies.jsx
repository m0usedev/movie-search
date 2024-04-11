import { useState, useEffect, useCallback } from "react"
import { useDebounce } from "@uidotdev/usehooks";

import useInfiniteScroll from "../../../utilities/hooks/useInfiniteScroll";

import { fetchMovies, sortMovies } from "../utilities/movies-functions";

const initialPageNumber = 1

export default function useMovies({ title, firstYear, secondYear, order }) {
  const [movies, setMovies] = useState(null) //array de peliculas
  const [lastTitle, setLastTitle] = useState(null) //controlamos la ultia version de datos pasados
  const debouncedSearch = useDebounce([title, firstYear, secondYear], 600) //esperamos a aque pase un tiempo antes de coger los datos

  const { scrollPage, setScrollPage, loading, setLoading, errorSearch, setErrorSearch } = useInfiniteScroll({ initialPageNumber })

  const reorderMovies = useCallback((moviesArray) => {
    if (order) {
      return sortMovies(moviesArray, order[0], order[1])
    }
    return moviesArray
  }, [order])

  useEffect(() => {
    if (!lastTitle) {
      setLastTitle([title, firstYear, secondYear])
    }
    if (debouncedSearch) {
      if (lastTitle &&
        (lastTitle[0] != debouncedSearch[0] ||
          lastTitle[1] != debouncedSearch[1] ||
          lastTitle[2] != debouncedSearch[2])) {
        setMovies(null)
        setLastTitle([title, firstYear, secondYear])
        setScrollPage(initialPageNumber)
        setLoading(true)
      }
    }
  }, [debouncedSearch])

  useEffect(() => {
    if (loading) {
      let newMovies = structuredClone(movies)

      fetchMovies(debouncedSearch[0], debouncedSearch[1], debouncedSearch[2], scrollPage)
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
  }, [order, reorderMovies])

  return { movies, reorderMovies, loading, errorSearch }
}