// DOM
const apiKey = '46e87513'
const main = document.querySelector('main')
const searchInput = document.querySelector('#search-input')
const formSearch = document.querySelector('#form-search')

// Data 
let movieSearchData = []
let removedDuplicates = []
let completeSearchData = []
let watchList = JSON.parse(localStorage.getItem('watchlist')) || []
let watchListObjects = JSON.parse(localStorage.getItem('watchlistObject')) || []

// Event Listeners
formSearch.addEventListener('submit', async (e) => {
    e.preventDefault()
    movieSearchData = []
    completeSearchData = []
    removedDuplicates = []
    await fetchMovies()
    deletingDuplicates(movieSearchData[0])
    await fetchCompleteInfo(removedDuplicates)
    renderMovies(completeSearchData)
})




async function fetchMovies(){
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
        if (!response.ok){
            throw new Error('failed to fetch data')
        }
        const data = await response.json()
        movieSearchData.push(data.Search)
    } catch(error){
        alert(error)
        console.error(error)
    } finally {
        formSearch.reset()
    }
}
async function fetchCompleteInfo(moviesArray){
    for (let item of moviesArray){
        try{
            const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${item}`)
            if (!response.ok){
                throw new Error('failed to fetch data')
            }
            const data = await response.json()
            if (!completeSearchData.includes(data.Title)){
                completeSearchData.push(data)
            }
        } catch(error){
            alert(error)
            console.error(error)
        }
    }
}
function deletingDuplicates(moviesArray){
    for (let item of moviesArray){
        if (!removedDuplicates.includes(item.Title)){
            removedDuplicates.push(item.Title)
        }
    }
}
function renderMovies(movieArray){
    main.innerHTML = ''
    for (let item of movieArray){
        // <div class="content">
        const contentEl = document.createElement('div')
        contentEl.classList.add('content')
        // <img src="">
        const imageEl = document.createElement('img')
        imageEl.src = item.Poster
        contentEl.appendChild(imageEl)
        // <div class="text">
        const textEl = document.createElement('div')
        textEl.classList.add('text')
        contentEl.appendChild(textEl)
        // <div class="flex">
        const flexEl = document.createElement('div')
        flexEl.classList.add('flex')
        textEl.appendChild(flexEl)
        // <h2>
        const h2El = document.createElement('h2')
        h2El.textContent = item.Title
        flexEl.appendChild(h2El)
        // <p class="star">
        const pstarEl = document.createElement('p')
        pstarEl.classList.add('star')
        pstarEl.innerHTML = `<i class="fa-solid fa-star"></i> ${item.imdbRating}`
        flexEl.appendChild(pstarEl)
        // <div class="flex2">
        const flex2El = document.createElement('div')
        flex2El.classList.add('flex2')
        textEl.appendChild(flex2El)
        // <p>
        const pRunTimeEl = document.createElement('p')
        pRunTimeEl.textContent = item.Runtime 
        flex2El.appendChild(pRunTimeEl)
        // <p>
        const pGenreEl = document.createElement('p')
        pGenreEl.textContent = item.Genre 
        flex2El.appendChild(pGenreEl)
        // <div class="flex3">
        const flex3El = document.createElement('div')
        flex3El.classList.add('flex3')
        textEl.appendChild(flex3El)
        // <a>
        const aEl = document.createElement('a')
        aEl.id = item.imdbID 
        aEl.innerHTML = `<i class="fa-solid fa-plus"></i>Watchlist`
        flex3El.appendChild(aEl)
        // <div>
        const lastDiv = document.createElement('div')
        textEl.appendChild(lastDiv)
        // <p>
        const pDescriptionEl = document.createElement('p')
        pDescriptionEl.textContent = item.Plot.substring(0,100) + '...'
        lastDiv.appendChild(pDescriptionEl)

        main.appendChild(contentEl)

    }

}

document.addEventListener('click', (e) => {
    completeSearchData.map(item => {
        if (e.target.id === item.imdbID){
            console.log(item)
            if (!watchList.includes(item.Title)){
                watchList.push(item.Title)
                watchListObjects.push(item)
                localStorage.setItem('watchlist', JSON.stringify(watchList))
                localStorage.setItem('watchlistObject', JSON.stringify(watchListObjects))
            }
        }
    })
})