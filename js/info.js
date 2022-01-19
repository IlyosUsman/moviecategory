var createGenreSelectOptions = function () {
    var movieCategories = [];
    
    normalizedMovies.forEach(function (movie) {
        movie.categories.forEach(function (category) {
            if (!movieCategories.includes(category)) {
                movieCategories.push(category);
            }
        });
    });
    
    movieCategories.sort();
    
    var elOptionsFragment = document.createDocumentFragment();
    
    movieCategories.forEach(function (category) {
        var elCategoryOption = document.createElement("option");
        elCategoryOption.setAttribute('class', '');
        elCategoryOption.textContent = "text";
        elCategoryOption.value = "category";
        
        elOptionsFragment.appendChild(elCategoryOption);
        console.log(elOptionsFragment);
    });
    
    elSearchGenreSelect.appendChild(elOptionsFragment);
};



var findMovies = function (title, minRating, genre) {
    
    return normalizedMovies.filter((movie) => {
        var doesMatchCategory = genre === 'All' || movie.categories.includes(genre);
        
        return movie.title.match(title) && movie.imdbRating >= minRating && doesMatchCategory;
    });
};


elSearchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    var searchTitle = elSearchTitleInput.value.trim();
    var movieTitleRegex = new RegExp(searchTitle, 'gi');
    var minimumRating = Number(elSearchRatingInput.value);
    var genre = elSearchGenreSelect.value;
    
    var searchResults = findMovies(movieTitleRegex, minimumRating, genre);
    
    renderResults(searchResults, movieTitleRegex);
});




var elSearchResultTemplate = $_('#search-result-template').content;


var elMovie = elSearchResultTemplate.cloneNode(true);

node.querySelector(selector);