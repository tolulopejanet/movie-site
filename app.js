const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6233ad34baeca52345faf7f8ba566848&page=1"
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=6233ad34baeca52345faf7f8ba566848&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL)
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movie){
    main.innerHTML= ''

    movie.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie
        
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="view" onclick="overview()">Overview</span>
            </div>
            <div class="overview">
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    }
    else {
        window.location.reload()
    }
})