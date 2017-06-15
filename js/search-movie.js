class SearchMovie extends React.Component {
    render() {
        return(
            <form className="search-form" role="search" onSubmit={(e) => this.handleClickSearch(e)}>
                <div className="input-group add-on">
                    <input type="text" ref="query" className="form-control input-group" placeholder="e.g. Titanic" />
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-default btn-md"><i className="glyphicon glyphicon-search"></i></button>
                    </span>
                </div>
                <div className={this.props.alert ? "alert alert-danger" : "hidden"}>{this.props.alertText}</div>
            </form>
        );         
    }

    // When user searches a movie, it calls searchMovie function in app.js
    handleClickSearch(e) {
        e.preventDefault();
        var queryValue = this.refs.query.value;
        this.props.searchMovie(queryValue);
    }
} 
