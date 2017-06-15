class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            savedMovieList: JSON.parse(localStorage.getItem("saved-movie-list")),
            savedIdList: JSON.parse(localStorage.getItem("saved-id-list"))
        });
    }

    render() {
        return(
            <div>
                <div className="header">
                    <p className="team-title">DAWG MOVIES</p>
                </div>
                <div className="container">
                    <button className="home-button btn btn-primary" type="submit" onClick={(e) => this.backHome(e)}>BACK HOME <i className="fa fa-home" aria-hidden="true"></i></button>
                    <h1 className="page-title">SHOPPING CART</h1>
                    <div id="shoppingcart">
                    {
                            this.state.savedMovieList ? (
                                <SavedMovies
                                    savedMovieList={this.state.savedMovieList}
                                    savedIdList={this.state.savedIdList}
                                    updateSavedList={(updateSavedIdlist, updateSavedMovieList) => this.updateSavedList(updateSavedIdlist, updateSavedMovieList)}
                                />
                            ) : null
                        }
                    </div>
                </div>
            </div>
        );
    }

    backHome(e) {
        window.location.assign("index.html");
    }

    updateSavedList(updateSavedIdlist, updateSavedMovieList) {
        this.setState({
            savedMovieList: updateSavedMovieList,
            savedIdList: updateSavedIdlist
        });
    }
}

ReactDOM.render(<Cart />, document.getElementById("cart"));