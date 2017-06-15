class SavedMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            value: 'dvd',
            dvdPrice: 14.95,
            blurayPrice: 24.95,
            amazonPrice: 34.95,
            netflixPrice: 44.95,
            currentPrice: 0,
            quantity: 0,
            costList: [],
            totalCost: 0.0,
            countList: [],
            totalCount: 0,
            isPageFirstTimeLoad: true
        });
    }

    render() {
        return(
            <div>
                <div className="cart-item">
                    {
                        this.props.savedMovieList.map((item, uid) => {
                            return (
                                <li key={uid} className="li-container">
                                    <img src={"https://image.tmdb.org/t/p/w154/" + item.poster} />
                                    <div className="content">
                                        <h3 className="title">{item.title}</h3>
                                        <p className="remove-button remove-button-1" type="submit" onClick={(e) => this.handleClickRemove(e, uid)}>REMOVE</p>
                                        <p className="overview">{item.overview}</p>
                                    </div>
                                    <form className="user-input">
                                        <p className="remove-button remove-button-2" type="submit" onClick={(e) => this.handleClickRemove(e, uid)}>REMOVE</p>
                                        <h3>Pick Your Option</h3>
                                        <div className="has-success has-feedback">
                                            <div className="select-input form-group col-xs-12 col-sm-3">
                                                <select className="form-control" onChange = {(e) => this.handleChangeSelect(e)}>
                                                    <option defaultValue="default">Pick Your Option</option>
                                                    <option value="dvdPrice">DVD ($14.95)</option>
                                                    <option value="blurayPrice">BluRay ($24.95)</option>
                                                    <option value="amazonPrice">Amazon ($34.95)</option>
                                                    <option value="netflixPrice">Netflix ($44.95)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group has-success has-feedback">
                                            <div className="quantity-input col-xs-12 col-sm-3">
                                                <input className="form-control" id="inputSuccess" type="number" min="0" ref="quantity" onChange={(e) => this.handleChangeInput(e, uid)} placeholder="quantity" />
                                            </div>
                                        </div>
                                        <button className="check-cost btn btn-success" onClick={(e) => this.calculateCost(e, uid)}>CHECK COST</button>
                                        <h3 className="cost">Cost: {numeral(this.state.costList[uid]).format('$0,0.00')}</h3>
                                    </form>
                                </li>
                            );
                        })
                    }
                    <div className="total">
                        <h2 className="total-count">Total Count: {this.state.totalCount}</h2>
                        <h2 className="total-cost">Total Cost: {numeral(this.state.totalCost).format("$0,0.00")} </h2>
                    </div>
                </div>
            </div>
        );
    }

    // When user changes option, reset current price
    handleChangeSelect(e) {
        e.preventDefault();
        var option = e.target.value;
        if (option === "dvdPrice") {
            this.setState({
                currentPrice: this.state.dvdPrice
            });
        } else if (option === "blurayPrice") {
            this.setState({
                currentPrice: this.state.blurayPrice
            });
        } else if (option === "amazonPrice") {
            this.setState({
                currentPrice: this.state.amazonPrice
            });
        } else if (option === "netflixPrice") {
            this.setState({
                currentPrice: this.state.netflixPrice
            });
        } else if (option === "default") {
            this.setState({
                currentPrice: 0
            });
        }
    }

    // When user inputs a value, reset quantity
    handleChangeInput(e, uid) {
        if(this.state.isPageFirstTimeLoad) {
            this.state.costList.length = 100;
            this.state.countList.length = 100;
            this.state.countList.fill(0);
            this.setState({
                isPageFirstTimeLoad: false
            });
        }

        var countList = this.state.countList;

        // Retrieve old count in the count list
        var oldCount = parseInt(countList[uid]);

        // Get user input value
        var inputValue = parseInt(e.target.value);

        countList.splice(uid, 1, inputValue);
        
        // Get total count
        var totalCount = 0;
        for(var i = 0; i < countList.length; i ++) {
            totalCount += parseInt(countList[i]);
        }

        this.setState({
            quantity: inputValue,
            countList: countList,
            totalCount: totalCount
        });
    }

    // Calculate total cost
    calculateCost(e, uid) {
        e.preventDefault();
        var costList = this.state.costList;
        var cost = this.state.currentPrice * this.state.quantity;

        // Modify the cost list based on uid
        costList.splice(uid, 1, cost);
        var totalCost = 0.0;
        costList.map(cost => {
            totalCost += cost;
        })
        this.setState({
            costList: costList,
            totalCost: totalCost,
            currentPrice: this.state.currentPrice
        });
    }

    // Remove the movie from the cart
    handleClickRemove(e, uid) {
        this.calculateCost(e, uid);
        var updatedSavedIdList = this.props.savedIdList.filter(function(location, index) {
            return index !== uid;
        });

         var updatedSavedMovieList = this.props.savedMovieList.filter(function(location, index) {
            return index !== uid;
        });

        var countList = this.state.countList;
        countList.splice(uid, 1, 0);

        var costList = this.state.costList;
        costList.splice(uid, 1, 0);

        // Update total count
        var totalCount = 0;
        for(var i = 0; i < countList.length; i ++) {
            totalCount += parseInt(countList[i]);
        }

        // Update total cost
        var totalCost = 0.0;
        costList.map(cost => {
            totalCost += cost;
        })

        this.setState({
            countList: countList,
            totalCount: totalCount,
            totalCost: totalCost,
            currentPrice: 0,
            quantity: 0
        });

        // Calls the function updateSavedLocationList created in app.js and pass in the new list
        this.props.updateSavedList(updatedSavedIdList, updatedSavedMovieList);

        // Update local storage
        // Return a string representation of the array (encode)
        localStorage.setItem("saved-id-list", JSON.stringify(updatedSavedIdList));
        localStorage.setItem("saved-movie-list", JSON.stringify(updatedSavedMovieList));
    }
}