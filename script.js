const apiKey = '46e87513'
const movieName = 'fight club'
const main = document.querySelector('main')
const searchInput = document.querySelector('#search-input')
const formSearch = document.querySelector('#form-search')

let arrMovies = []
formSearch.addEventListener('submit', (e) => {
    arrMovies =[]
    e.preventDefault()
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        pushData(data.Search, arrMovies)
        fetchData(arrMovies)
        setTimeout(renderData, 1000)
    })
    formSearch.reset()
})

const pushData = (arr1, arr2) => {
    for (let item of arr1){
        arr2.push(item.Title)
    }
}

let html =''
const fetchData = (arr) => {
    html = ''
    for (let item of arr){
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${item}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
                            <a href="#"><i class="fa-solid fa-plus"></i> Watchlist</a>
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


















