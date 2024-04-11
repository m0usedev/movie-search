
<h1 align="center" id="title">Movie Search React-.js</h1>

Proyecto desarrollado en React.js para realizar busqueda de peliculas a traves de la API OMDB.

## 📖 Comentarios del desarrollo:

Este fue un proyecto muy interesante de hacer por varias razones.

1. Pude poner en práctica la creacioón de custom hooks, concretamente con el de `useMovies`, que es el hook encargado de aportar la lista de películas a mostrar e informar sobre el proceso de petición de películas a la API. Y, `useInfiniteScroll`, que trata de un hook creado por mí de un Infinite Scroll para ir cargando nuevas películas a medida que se desciende en el resultado de búsqueda.

2. Estoy bastante contento con la distribución de archivos que hice, sobre todo con todo lo trabajado en el archivo **movies-functions.js**. Este es un archivo que concentra toda la estructura de información sobre las películas y todas las operaciones de ordenación y llamadas a la API. El objetivo era que en un solo sitio estuviera toda la información sobre el JSON de las películas, si el día de mañana hubiera que cambiar algo solo tendría que hacerlo en ese archivo y valdría para toda la página. También el hecho de poder hacer uso de la llamada a la API y a sus funciones desde cualquier archivo, sin depender del hook que hace uso principal de sus funciones, `useMovies`.

3. También pude incorporar componentes creados por otros usuarios, observando el cómo incluirlos y agilizando el proceso de desarrollo. Estoy hablando de los componentes `Box` y `Slider` de los materiales de [mui](https://mui.com/).

4. Con la misma línea del punto anterior también pude hacer la práctica de la incorporación de hooks personalizados por otros usuarios como el `debounce`, también de los materiales [mui](https://mui.com/). Este hook me permitió que tanto las búsquedas de películas por nombres como el filtro por año tuvieran una espera de unos segundos sin modificaciones antes de aplicar los cambios.

Ha sido un proyecto realmente interesante de realizar y, considero, que muy completo.

## 🛠️ Pasos de instalación:

1. Descargar el repositorio de **GitHub**.

2. Instala **Node.js** desde su pagina en la versión **LTS**: **nodejs.org**

3. Abrir el proyecto en **VS Code**.

4. Abrir el terminar y ejecutar:

```
npm install
```

5. Entra en [omdb](http://www.omdbapi.com) y obten tu **key** de uso de la **API**.

6. Ir al archivo `src\functions\movies-functions.js` y poner tu **key** en la constante `API_KEY_MOVIES`

7. Después ejecutar el comando: 

```
npm run dev
```

8. Abre el enlace que se te genera y prueba el proyecto ;)

```
Local:   http://localhost:XXXX/
```
  
## 💻 Desarrollado con:

*   Vite
*   React.js
