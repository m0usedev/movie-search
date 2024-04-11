import { useState, useEffect } from "react"

export default function useInfiniteScroll ({initialPageNumber}) {
  const [errorSearch, setErrorSearch] = useState(false)
  const [scrollPage, setScrollPage] = useState(initialPageNumber);
  const [noMoreScroll, setNoMoreScroll] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if(!noMoreScroll) {
        const element = document.documentElement;
        // Verificar si el scroll ha llegado al final de la página
        if ((element.scrollHeight - element.scrollTop) <= element.clientHeight+100) {
          // Incrementar el número de página y establecer loading en true
          setScrollPage(scrollPage+1);
          setNoMoreScroll(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect( () => {
    if(!loading){
      setLoading(true);
    }
  }, [scrollPage])

  useEffect( () => {
    if(!loading){
      setNoMoreScroll(false)
    }
  }, [loading])


  return { scrollPage, setScrollPage, loading, setLoading, errorSearch, setErrorSearch }
}