// Select elements from DOM
let elForm = document.querySelector("#form");
var elSearchInput = document.querySelector("#search_input");
let elRating = document.querySelector("#rating");
let elCategorySelect = document.querySelector("#category_select");
let elBookmarkList = document.querySelector("#bookmark_ul");
let elResultCount = document.querySelector("#result_count");
let elWrapper = document.querySelector("#wrapper");


var elMovieItemTemplate = document.querySelector('#movie-card-item').content
var elBookmarkedMovieTemplate = document.querySelector('#bookmarked-movie-template').content;


// Get movies list 
let slicedMovies = movies.slice(0, 20);

var normolizedMovieList = slicedMovies.map(function (movieItem, index) {
    return {
        id: index + 1,
        title: movieItem.Title.toString(),
        categories: movieItem.Categories,
        rating: movieItem.imdb_rating,
        year: movieItem.movie_year,
        imageLink: `https://i.ytimg.com/vi/${movieItem.ytid}/mqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movieItem.ytid}`
    }
})



var renderCategories = function (movieList, renderSelect) {
    
    var resultCategoryList = []
    
    movieList.forEach(item => {
        var splittedCategory = item.categories.split('|')
        
        // console.log(splittedCategory);
        
        splittedCategory.forEach(categoryItem => {
            
            var isCategoryIncludes = resultCategoryList.includes(categoryItem)
            // console.log(isCategoryIncludes);
            
            
            if(!isCategoryIncludes) {
                resultCategoryList.push(categoryItem)
            }
        })
        
    })
    
    resultCategoryList.sort()
    
    var elOptionsFragment = document.createDocumentFragment();
    
    resultCategoryList.forEach(function (category) {
        var elCategoryOption = document.createElement("option");
        elCategoryOption.setAttribute('class', ' ');
        elCategoryOption.textContent = category;
        elCategoryOption.value = category;
        
        elOptionsFragment.appendChild(elCategoryOption);
    });
    
    renderSelect.appendChild(elOptionsFragment);
}

renderCategories(normolizedMovieList, elCategorySelect)



// Create render function
function renderMovies(movieArray, wrapper){
    var rusultRender = document.createDocumentFragment()
    
    movieArray.forEach(movie => {
        var movieCardItem = elMovieItemTemplate.cloneNode(true)
        
        movieCardItem.querySelector('#card-image').src = movie.imageLink;
        movieCardItem.querySelector('#card-title').textContent = movie.title;
        movieCardItem.querySelector('#year').textContent = `Year: ${movie.year}`;
        movieCardItem.querySelector('#rating').textContent = `Rating: ${movie.rating}`;
        movieCardItem.querySelector('#movie-link').href = movie.youtubeLink;
        movieCardItem.querySelector("#bookmark").dataset.idJonSalom = movie.id
        
        rusultRender.appendChild(movieCardItem);
    });
    wrapper.innerHTML = null
    
    wrapper.appendChild(rusultRender)
    
    elResultCount.textContent = `Search results: ${movieArray.length}`;
}

renderMovies(normolizedMovieList, elWrapper);

































