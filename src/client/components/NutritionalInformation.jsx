import React, { Component, useState } from 'react';
import UsdaCaller from '../classes/USDAcaller';

const FoodBar = ({ foodData, addToTotal }) => {
  const [open, setOpen] = useState(false);

  const { description, foodNutrients, brandOwner } = foodData;

  const getNutrients = data => {
    const obj = {};
    data.forEach(nutrient => {
      switch (nutrient.nutrientName) {
        case 'Protein':
          obj.protein = nutrient.value;
          break;
        case 'Total lipid (fat)':
          obj.fat = nutrient.value;
          break;
        case 'Carbohydrate, by difference':
          obj.carbs = nutrient.value;
          break;
        case 'Energy':
          obj.calories = nutrient.value;
        default:
          break;
      }
    });
    return obj;
  };

  const nutrientsObject = getNutrients(foodNutrients);

  const addFood = e => {
    e.preventDefault();
    addToTotal(nutrientsObject);
  };

  const showNutrients = () => {
    const obj = nutrientsObject;
    return (
      <div>
        <div className="row">
          <div className="col s6 m3">
            <span className="sub-text">Calories: {obj.calories}</span>
          </div>
          <div className="col s6 m3 ">
            <span className="sub-text">Carbs: {obj.carbs}</span>
          </div>

          <div className="col s6 m3 ">
            <span className="sub-text">Fat: {obj.fat}</span>
          </div>
          <div className="col s6 m3 ">
            <span className="sub-text">Protein: {obj.carbs}</span>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m8">
            <span className="grey-text">
              Calculated from value per serving size measure
            </span>
          </div>
          <div className="col s12 m4">
            <button className="btn" onClick={addFood}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <tr>
      <td
        className="pointer table-cell"
        onClick={() => {
          console.log(description, open, nutrientsObject);
          setOpen(!open);
        }}
      >
        <span className="header">{description} </span>
        <div>
          <span>{brandOwner}</span>
        </div>
        {open ? showNutrients() : null}
      </td>
    </tr>
  );
};

const NutritionalInformationForm = () => {
  const [errors, setErrors] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [usdaData, setUsdaData] = useState({});

  const usda = new UsdaCaller();

  const checkUSDA = () => {
    if (searchTerm) {
      usda.search(searchTerm, response => {
        console.log(response);
        if (response.error) {
          setErrors(response.error);
        } else {
          setUsdaData(response);
        }
      });
    } else {
      setUsdaData({});
    }
  };

  const clickHandler = e => {
    e.preventDefault();
  };

  const showFoodDetails = () => {
    if (usdaData.foods) {
      return usdaData.foods.map((food, i) => (
        <FoodBar key={`$food-bar-{i}`} foodData={food} />
      ));
    }
  };

  return (
    <div>
      <div className="row">
        <form className="col s6 m4">
          <div className="row">
            <div className="col s12 m6">
              <input type="text" id="protein" placeholder="input grams" />
              <label for="protein">Protein</label>
            </div>
            <div className="col s12 m6">
              <input type="text" id="carbs" placeholder="input grams" />
              <label for="carbs">Carbohydrates</label>
            </div>
            <div className="col s12 m6">
              <input type="text" id="fats" placeholder="input grams" />
              <label for="fats">Fats</label>
            </div>
          </div>
          <div className="row">
            <button type="submit" className="btn" onClick={clickHandler}>
              send
            </button>
          </div>
        </form>
        <form className="col s6 m8">
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="What did you eat?"
                id="food"
                type="text"
                class="validate"
                onChange={e => {
                  setSearchTerm(e.target.value);
                  checkUSDA();
                }}
              />

              <table>{showFoodDetails()}</table>
            </div>
          </div>
        </form>
      </div>

      {<div>{errors}</div>}
    </div>
  );
};

export default NutritionalInformationForm;
