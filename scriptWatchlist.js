const main = document.querySelector('main')
let watchList = JSON.parse(localStorage.getItem('watchlist')) || []
let watchListObjects = JSON.parse(localStorage.getItem('watchlistObject')) || []

if (watchList.length > 0){
    main.innerHTML = renderHTML()
}

function renderHTML() {
    let html = ''
    for (let item of watchListObjects){
        html += `
                <div class="content">
                    <img src="${item.Poster}" alt="">
                    <div class="text">
                        <div class="flex">
                            <h2>${item.Title}</h2>
                            <p class="star"><i class="fa-solid fa-star"></i> ${item.imdbRating}</p>
                        </div>
                        <div class="flex2">
                            <p>${item.Runtime}</p>
                            <p>${item.Genre}</p>
                        </div>
                        <div class="flex3">
                            <a href="#" id=${item.imdbID}>Remove</a>
                        </div>
                        <div>
                            <p>${item.Plot.substring(0,100).trim()}...</p>
                        </div>
                    </div>
                </div>`

    }
    return html
}

function removeMovie(){

}

document.addEventListener('click', (e) => {
    watchListObjects.map((item, index) => {
        if (e.target.id === item.imdbID){
            watchList.splice(index, 1)
            watchListObjects.splice(index, 1)
            localStorage.setItem('watchlist', JSON.stringify(watchList))
            localStorage.setItem('watchlistObject', JSON.stringify(watchListObjects))
            window.location.reload()
        }
    })
})