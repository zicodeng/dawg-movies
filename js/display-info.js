class DisplayInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
        });
    }
    
    render() {
        return (
            <div className="display-info-container">
                <ul className="display-info">
                    <h1 className="genre-name">{this.props.current.toUpperCase()}</h1>
                    {
                        this.props.movieList.map((item, uid) => {
                            return (
                                <li key={uid}>
                                    <div className="li-container">
                                        <img alt = "Poster Missing!" src = {"https://image.tmdb.org/t/p/w154/" + item.poster_path}/>
                                        <div className="content">
                                            <h3 className="title">{item.title}</h3>
                                            <p className="overview">{item.overview}</p>
                                            {
                                                (this.props.savedIdList.indexOf(item.id) >= 0) ? (
                                                    <button className="btn btn-danger">Added</button>
                                                ) : (
                                                    <button className="btn btn-success" type="submit" onClick={(e) => this.handleClickAdd(e, item.title, item.id, item.poster_path, item.overview)}>ADD TO CART</button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

    handleClickAdd(e, movieName, movieID, poster, overview) {
        e.preventDefault();
        this.props.addToCart(movieName, movieID, poster, overview);
    }
}