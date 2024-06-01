const apiKey = '46e87513'
const movieName = 'fight club'
const main = document.querySelector('main')
const searchInput = document.querySelector('#search-input')
const formSearch = document.querySelector('#form-search')

let arrMovies = []
let MyWatchlist = []
let movieId = []
let myWatchlistId = []

formSearch.addEventListener('submit', (e) => {
    arrMovies = []
    movieId = []
    e.preventDefault()
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        pushData(data.Search, arrMovies, movieId)
        fetchData(arrMovies)
        setTimeout(renderData, 1000)
    })
    formSearch.reset()
})

const pushData = (arr1, arr2, arr3) => {
    for (let item of arr1){
        arr2.push(item.Title)
        arr3.push(item.imdbID)
    }
}

let html =''
const fetchData = (arr) => {
    html = ''
    for (let item of arr){
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${item}`)
            .then(res => res.json())
            .then(data => {
                html += `    
                <div class="content">
                    <img src="${data.Poster}" alt="">
                    <div class="text">
                        <div class="flex">
                            <h2>${data.Title}</h2>
                            <p class="star"><i class="fa-solid fa-star"></i> ${data.imdbRating}</p>
                        </div>
                        <div class="flex2">
                            <p>${data.Runtime}</p>
                            <p>${data.Genre}</p>
                        </div>
                        <div class="flex3">
                            <a href="#" id=${data.imdbID}><i class="fa-solid fa-plus"></i>Watchlist</a>
                        </div>
                        <div>
                            <p>${data.Plot.substring(0,100).trim()}...</p>
                        </div>
                    </div>
                </div>`

            })
    }
}

const renderData = () => {
    main.innerHTML = html
}

const addToWatchlist = (index) => {
    MyWatchlist.push(arrMovies[index])
    myWatchlistId.push(movieId[index])
    localStorage.setItem('movies', JSON.stringify(MyWatchlist))
    localStorage.setItem('moviesId', JSON.stringify(myWatchlistId))
}

document.addEventListener('click', (e) => {
    if (movieId.includes(e.target.id)){
        const index = movieId.indexOf(e.target.id)
        document.getElementById(`${e.target.id}`).addEventListener('click', addToWatchlist(index))
    }
})







