import React, { useState, useEffect } from 'react';
import UsdaCaller from '../classes/USDAcaller';
import server from '../server';
import Preloader from './Preloader';
/*
 * TODO: Add commonly selected foods and a message to let user know that macro fields can be edited directly.
 */
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

const getMealSheet = server.getSheetsData('meals');

const NutritionalInformationForm = ({ currentUser }) => {
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [usdaData, setUsdaData] = useState({});
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [mealSheet, setMealSheet] = useState();

  useEffect(() => {
    if (!mealSheet) {
      console.log(getMealSheet);
      getMealSheet
        .then(sheet => {
          setMealSheet(sheet);
          setReady(true);
          console.log('getMealSheet callback', mealSheet);
        })
        .catch(err => console.log(err));
    }
  });

  const usda = new UsdaCaller();

  const addToTotal = nutrientsObject => {
    console.log('addToTotal', nutrientsObject);
    if (nutrientsObject.carbs) setCarbs(nutrientsObject.carbs + carbs);
    if (nutrientsObject.fat) setFat(nutrientsObject.fat + fat);
    if (nutrientsObject.protein) setProtein(nutrientsObject.protein + protein);
    console.log('updatedMeal', carbs, protein, fat);
  };

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
    console.log('send', carbs, protein, fat);
    const timeNow = new Date().toISOString();
    const newRow = [
      timeNow,
      currentUser.email,
      protein,
      fat,
      carbs,
      calculateCalories(),
    ];

    mealSheet.values.push(newRow);
    // const {values} = mealSheet;
    console.log('about to updateAllValues', mealSheet);
    const updateValues = server.updateAllValues(mealSheet);
    console.log(updateValues);
    updateValues
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    mealSheet.sheet
      .getRange(1, 1, values.length, values[0].length)
      .setValues(values);
  };

  const showFoodDetails = () => {
    if (usdaData.foods) {
      return usdaData.foods.map((food, i) => (
        <FoodBar
          key={`$food-bar-${i}`}
          addToTotal={addToTotal}
          foodData={food}
        />
      ));
    }
  };

  const calculateCalories = () => {
    const fatCalories = fat * 9;
    const carbCalories = carbs * 4;
    const proteinCalories = protein * 4;
    return fatCalories + carbCalories + proteinCalories;
  };
  if (ready) {
    return (
      <div className="light-grey-text dark-grey min-full-height">
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <h6>
                Enter your macros below or search the USDA database for the
                nutritional information of your meal
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col s6 m3 nutrition-form white black-text shadow-center">
              <div className="row">
                <div className="col s8 offset-s2">
                  <input
                    className="light-grey-text"
                    type="text"
                    id="protein"
                    placeholder="input grams"
                    onChange={e => setProtein(e.target.value)}
                    value={protein}
                  />
                  <label for="protein">Protein</label>
                </div>
                <div className="col s8 offset-s2">
                  <input
                    className="light-grey-text"
                    type="text"
                    id="carbs"
                    placeholder="input grams"
                    onChange={e => setCarbs(e.target.value)}
                    value={carbs}
                  />
                  <label for="carbs">Carbohydrates</label>
                </div>
                <div className="col s8 offset-s2">
                  <input
                    className="light-grey-text"
                    type="text"
                    id="fats"
                    placeholder="input grams"
                    onChange={e => setFat(e.target.value)}
                    value={fat}
                  />
                  <label for="fats">Fats</label>
                </div>
                <div className="col s8 offset-s2">
                  <input
                    className="light-grey-text"
                    disabled
                    type="text"
                    id="total"
                    placeholder=""
                    value={calculateCalories()}
                  />
                  <label for="total">Total Calories</label>
                </div>
              </div>
              <div className="row">
                <button
                  type="submit"
                  className="btn"
                  onClick={() => clickHandler}
                >
                  send
                </button>
              </div>
            </div>
            <div className="col s12 m6">
              <div class="row text-center">
                <div className="col">
                  <h6>Begin typing to search the USDA database</h6>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input
                      className="light-grey-text"
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
              </div>
            </div>

            {<div>{errors}</div>}
          </div>
        </div>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

export default NutritionalInformationForm;
