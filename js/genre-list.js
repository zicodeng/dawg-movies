class GenreList extends React.Component {
   constructor(props) {
       super(props);

       this.state = ({
           showGenre1: false,
           genreList: [],
           isPageFirstTimeLoad: true
       });
   }

   render() {
       if(this.state.isPageFirstTimeLoad) {
           var url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY + "&language=en-US";
           fetch(url)
           .then((response) => {
               return response.json();
           })
           .then((json) => {
               this.setState({
                   genreList: json.genres,
                   isPageFirstTimeLoad: false,
               });
           })
           .catch((error) => {
           });
       }

       return (
            <div className="genre-container">
                {
                    !this.state.showGenre ? (
                        <div className="show-genre arrow-down" type="click" onClick={(e) => this.handleClickArrow()}>SHOW GENRES</div>
                    ) : (
                        <div className="show-genre arrow-up" type="click" onClick={(e) => this.handleClickArrow()}>HIDE GENRES</div>                        
                    )
                }

                
                <ul className={this.state.showGenre ? null : "hidden"}>
                    {
                        this.state.genreList.map((item, uid) => {
                            return <li className="arrow-left" key={uid} onClick={(e) => this.handleClickGenre(uid)}>{item.name}</li>
                        })
                    }
                    <li className="arrow-left" type="click" onClick={(e) => this.handleClickPopular(e)}>Popular</li>
                </ul>
                <div className="clear-float"></div>
           </div>
       )
   }

   handleClickPopular(e) {
       e.preventDefault();
       this.props.loadPopularMovie(e);
   }

   handleClickGenre(uid) {
       var genreID = this.state.genreList[uid].id;
       var genreName = this.state.genreList[uid].name;
       this.props.searchGenre(genreID, genreName);
   }

   handleClickArrow() {
       if(this.state.showGenre) {
           this.setState({
               showGenre: false
           });
       } else {
           this.setState({
               showGenre: true
           });
       }
   }
}