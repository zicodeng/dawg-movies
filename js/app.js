var API_KEY = "bcbba87ae2b2ac2864f775ae2cd00661";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            movieList: [],
            isPageFirstTimeLoad: true,
            count: 1,
            url: "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US",
            nextHide: false,
            prevHide: true,
            current: "Popular",
            savedMovieList: localStorage.getItem("saved-movie-list") === null ? [] : JSON.parse(localStorage.getItem("saved-movie-list")),
            savedIdList: localStorage.getItem("saved-id-list") === null ? [] : JSON.parse(localStorage.getItem("saved-id-list")),
            alert: false
        });
    }


    render() {
        if(this.state.isPageFirstTimeLoad) {
            this.loadMovie();
        }
        return(
            <div>
                <div className="container">
                    <div className="movie-header">
                        <button className=" cart btn btn-success" onClick={(e) => this.goToCart(e)}>MY CART <i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
                        <p className="team-title">DAWG MOVIES</p>
                        <SearchMovie
                            searchMovie={(queryValue) => this.searchMovie(queryValue)}
                            alert={this.state.alert}
                            alertText={this.state.alertText}
                        />
                    </div>
                    <GenreList
                        searchGenre={(genreID, genreName) => this.searchGenre(genreID, genreName)}
                        loadPopularMovie={(e) => this.loadPopularMovie(e)}
                    />
                    <DisplayInfo
                        movieList={this.state.movieList}
                        current={this.state.current}
                        addToCart={(movieName, movieID, poster, overview) => this.addToCart(movieName, movieID, poster, overview)}
                        savedIdList={this.state.savedIdList}
                    />
                    <button className={this.state.prevHide ? "hidden" : "pagination pagi-prev btn btn-primary"} onClick={(e) => this.goToPrevPage(e)}>PREVIOUS PAGE</button>
                    <button className={this.state.nextHide ? "hidden" : "pagination pagi-next btn btn-primary"} onClick={(e) => this.goToNextPage(e)}>NEXT PAGE</button> 
                    <p className="pagination pageNum">PAGE {this.state.count} OF {this.state.totalPages}</p>
                </div>
            </div>
        )
    }

    loadPopularMovie(e) {
        var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US";
        this.setState({
            current: "Popular"
        });
        this.fetchURL(url, 1);
    }

    goToPrevPage(e) {
        var count = this.state.count - 1;
        this.goToPage(count);
    }

    goToNextPage(e) {
        var count = this.state.count + 1;
        this.goToPage(count);
    }

    goToPage(count) {
        var search = this.state.url.search("page");
        if(search == -1){
            var url = this.state.url + "&page=" + count;
        }else{
            var url = this.state.url.substr(0, search + 5) + count + this.state.url.substr(search + 5 + count.toString().length);
        }
        this.fetchURL(url, count);
    }

    goToCart(e) {
        window.location.assign("cart.html");
    }

    // Search function
    searchMovie(queryValue) {
        var url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&query=" + queryValue;
        this.setState({
            current: queryValue
        });
        this.fetchURL(url, 1);
    }

    searchGenre(genreID, genreName) {
        var url = "https://api.themoviedb.org/3/discover/movie?api_key=da9b1be25a4ba7b018a4a6248a6f5af8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&with_genres=" + genreID;
        this.setState({
            current: genreName
        });
        this.fetchURL(url, 1);
    }

    // Get popular genre movie info when page first loads 
    loadMovie() { 
        var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US";
        this.fetchURL(url, 1);
    }

    fetchURL(url, count) {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if(json.results.length > 0) {
                this.setState({
                    movieList: json.results,
                    isPageFirstTimeLoad: false,
                    count: count,
                    url: url,
                    nextHide: count >= parseInt(json.total_pages) ? true : false,
                    prevHide: count <= 1 ? true : false,
                    totalPages: json.total_pages,
                    alert: false
                });
            } else {
                this.setState({
                    alert: true,
                    alertText: "Error: Not Found Movie",
                    movieList: json.results,
                    nextHide: true
                });
            }
        })
        .catch((error) => {
            this.setState({
                alert: true,
                alertText: error.message
            });
        });
    }

    // Add to cart function
    // Add user selected movies to local storage
    addToCart(movieName, movieID, poster, overview) {
        var savedMovieList = this.state.savedMovieList;
        var savedIdList = this.state.savedIdList;

        // If the movie is not in the list, then add to local storage
        if (savedIdList.indexOf(movieID) < 0) {
            var movieObj = {
                title: movieName,
                poster: poster,
                overview: overview
            }
            savedMovieList.push(movieObj);

            savedIdList.push(movieID);

            this.setState({
                savedMovieList: savedMovieList,
                savedIdList: savedIdList,
            });

            // Save to local storage
            var savedMovieListJson = JSON.stringify(savedMovieList);
            var savedIdListJson = JSON.stringify(savedIdList);
            localStorage.setItem("saved-movie-list", savedMovieListJson);
            localStorage.setItem("saved-id-list", savedIdListJson);
        }
    }
}

ReactDOM.render(<App />, document.getElementById("app"));