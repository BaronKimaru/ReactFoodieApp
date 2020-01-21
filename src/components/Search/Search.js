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

    render() {
        console.log(this.state.meals);
        return (
            <div style={searchDiv}>
                <h1 style={h1Style}> Meal Search React App </h1>
                <input
                    name="searchText"
                    type="text"
                    placeholder="Search Meal..."
                    style={mealInputStyle}
                    value={this.state.searchText}
                    onChange={event => this.handleMealInputChange(event)}
                />
                <button onClick={this.handleMealSearch} style={btnStyle}> Search </button>

                <br/>

                {this.state.meals ? (
                    <div style={mealsContainerStyle}>
                        {this.state.meals.map((meal, index) => (
                            <div style={individualMealStyle} key={index} >
                                <h1>{ meal.strMeal }</h1>
                                <img src={ meal.strMealThumb } alt="meal-thumbnail" style={mealImgStyle} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Try searching for a meal</p>
                )}

            </div>
        );
    }
}

const h1Style = {
    color: "#4286f4",
    marginTop: "30px",
    marginBottom: "60px"
};

const searchDiv = {
    textAlign: "center",
    width: "80%",
    margin: "0 auto"
};

const mealInputStyle = {
    width: "100%",
    margin: "10px",
    padding: "18px 10px",
    borderRadius: "5px",
    border: "1px solid #4e5766",
    boxShadow: "1px 0.5px #888888",
    fontSize: "18px"
};

const btnStyle={
    padding: "12px 10px",
    width: "20%",
    borderRadius: "8px",
    backgroundColor: "#4286f4",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "18px"
};

const mealsContainerStyle = {
    display: "grid",
    // flexDirection: "column"
    gridTemplateColumns: "auto auto auto",
    gridColumnGap: "10px",
    gridRowGap: "15px",
    marginTop: "60px",
    border: "0.1px solid #4286f4"
};

const individualMealStyle = {
    boxShadow: "1px 0.5px #4286f4",
    margin: "10px",
};

const mealImgStyle = {
    width: "50%"
};

Search.propTypes = {};

export default Search;