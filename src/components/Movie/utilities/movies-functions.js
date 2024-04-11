export const API_KEY_MOVIES = '39ff8a91'

export const URLMOVIES = 'http://www.omdbapi.com/?apikey='+API_KEY_MOVIES

export function refactorArrayMovies ( array ) {
  return (
    array.map( (element) => {
      return(
        {
          title  : element.Title,
          year   : element.Year,
          img    : element.Poster,
          imdbID : element.imdbID
        }
      )
    })
  )
}

export async function fetchMovies(title, firstY, secondY, page = 1) {
  try {
    const response = await fetch(
      URLMOVIES + 
      (title ? '&s=' + title : '') + 
      ('&page=' + page) +
      (firstY==secondY ? '&y=' + firstY : '')
    );
    const data = await response.json();
    if (data && data.Search) {
      if(firstY==secondY){
        return refactorArrayMovies(data.Search)
      }
      return findMoviesInYears(refactorArrayMovies(data.Search), firstY, secondY)
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Hubo un error al cargar las películas');
  }
}

export function findMoviesInYears(array, firstY, secondY) {
  return array.filter(element => {
      const year = parseInt(element.year);
      return (year >= firstY && year <= secondY)
    })
}

export function sortMovies(movies, sortBy, sortOrder = 'asc') {
  if (movies) {
    let moviesReorder = structuredClone(movies);
    switch (sortBy) {
      case 'title':
        return moviesReorder.sort((a, b) => {
          const comparison = a.title.localeCompare(b.title);
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      case 'year':
        return moviesReorder.sort((a, b) => {
          const comparison = parseInt(a.year) - parseInt(b.year);
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      case 'img':
        return moviesReorder.sort((a, b) => {
          const comparison = a.img.localeCompare(b.img);
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      case 'imdbID':
        return moviesReorder.sort((a, b) => {
          const comparison = a.imdbID.localeCompare(b.imdbID);
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      default:
        return moviesReorder;
    }
  }
}
