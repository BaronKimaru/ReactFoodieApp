import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../App.css';

class Search extends Component {
    state = {
        searchText: '',
        mealSearchApiUrl: 'https://www.themealdb.com/api/json/v1/1/search.php',
        meals: []
    };

    // handle state change
    handleMealInputChange = (event) => {
        this.setState({ searchText: event.target.value })
    };

    //api caller
    //handle meal search
    ApiMealSearch = (searchText) => {
        console.log("API meal Search call initialized");
        axios.get(`${this.state.mealSearchApiUrl}?s=${searchText}`)
            .then(res => this.setState({ meals: res.data.meals })) //console.log("result data: " + res.data)
            .catch(err => console.log(err))

        // Alternative
        // fetch(`${this.state.mealSearchApiUrl}?s=${searchText}`)
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(jsonData => {
        //         // console.log(jsonData.meals);
        //         this.setState({ meals: jsonData.meals });
        //     });
    };

    //handle meal search
    handleMealSearch = () => {
        this.ApiMealSearch(this.state.searchText);
    };

    individualMealStyle = (index) => {
        console.log("index: %o", index);
        return {
            padding: "10px",
            border: "2px solid #37003c",
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "55px 10px",
            // -ms-transform: "rotate(7deg)", /* IE 9 */
            // -webkit-transform: "rotate(7deg)", /* Safari */
            // boxShadow: "10px 10px #37003c",
            transform: index %2 === 0 ? "rotate(7deg)" : "rotate(-8deg)"
        }

    };

    render() {
        console.log(this.state.meals);
        return (
            <div style={searchDiv}>
                <h1 style={appHeaderStyle}>React Foodie App </h1>
                <input
                    name="searchText"
                    type="text"
                    placeholder="Enter Meal of Choice e.g. chicken..."
                    style={mealInputStyle}
                    value={this.state.searchText}
                    onChange={event => this.handleMealInputChange(event)}
                />
                <button onClick={this.handleMealSearch} className="btn" > Search </button>

                <br/>

                {this.state.meals ? (
                    <div className="mealsContainerStyle">
                        {this.state.meals.map((meal, index) => (

                            <div key={index} style={this.individualMealStyle(index)}>
                                <div className="img-hover-zoom">
                                    <img src={ meal.strMealThumb } alt="meal-thumbnail" style={mealImgStyle} />
                                </div>
                                <h1 style={mealHeaderStyle}>{ meal.strMeal } </h1>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1 style={mealHeaderStyle}> Cannot find said images. <br/> Try searching for another </h1>
                )}

            </div>
        );
    }
}

const appHeaderStyle = {
    fontSize: "3rem",
    color: "#37003c",
    margin:"100px 0 20px",
    textAlign: "center"
};

const mealHeaderStyle = {
    fontSize: "2rem",
    color: "#37003c",
    margin: "10px 0 5px",
    textAlign: "center"
};

const searchDiv = {
    textAlign: "center",
    width: "100%",
    height: "100vh",
    // padding: "20px",
    // border: "0.2px solid #37003C",
    background: "#f4f4f4"
};

const mealInputStyle = {
    width: "75%",
    textAlign: "center",
    margin: "25px auto",
    padding: "18px 10px",
    borderRadius: "5px",
    border: "1px solid #37003c",
    boxShadow: "1px 0.5px #37003c",
    fontFamily: "inherit",
    fontSize: "22px"
};


const mealImgStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "10px",
};

// Search.propTypes = {};

export default Search;