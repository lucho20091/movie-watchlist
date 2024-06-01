const apiKey = '46e87513'
const main = document.querySelector('main')
const movies = JSON.parse(localStorage.getItem('movies'))
const moviesId = JSON.parse(localStorage.getItem('moviesId'))

console.log(main)
console.log(movies)
let html = ''
for (let item of movies){
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
                            <a href="#" id=${data.imdbID}>Remove</a>
                        </div>
                        <div>
                            <p>${data.Plot.substring(0,100).trim()}...</p>
                        </div>
                    </div>
                </div>`
        })
}

if (movies.length > 0) {
setTimeout(()=> {
    main.innerHTML = html
}, 500)}

document.addEventListener('click', (e)=> {
    console.log(e.target.id)
    if (moviesId.includes(e.target.id)){
        const index = movies.indexOf(e.target.id)
        movies.splice(index, 1)
        moviesId.splice(index, 1)
        console.log(movies)
        localStorage.setItem('movies', JSON.stringify(movies))
        localStorage.setItem('moviesId', JSON.stringify(moviesId))
        window.location.reload()
    }
})