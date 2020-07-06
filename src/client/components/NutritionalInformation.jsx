import React, { useState, useEffect } from 'react';
import UsdaCaller from '../classes/USDAcaller';
import server from '../server';
import Preloader from './Preloader';
import FoodBar from './NutritionComponents/FoodBar';
import SavedMealsTable from './NutritionComponents/SavedMealsTable';
import M from 'materialize-css';
/*
 * TODO: Add commonly selected foods and a message to let user know that macro fields can be edited directly.
 */

const NutritionalInformationForm = ({ currentUser }) => {
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [usdaData, setUsdaData] = useState({});
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [savedMealSheet, setSavedMealSheet] = useState();

  useEffect(() => {
    refreshSheet();
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

  const addToMealSheet = e => {
    e.preventDefault();
    const timeNow = new Date().toISOString();
    const newRow = {
      time: timeNow,
      email: currentUser.email,
      protein: protein,
      fat: fat,
      carbs: carbs,
      calories: calculateCalories(),
    };

    server
      .addRowToSheet('meals', newRow)
      .then(newRow => {
        console.log(newRow);
        M.toast({html: 'Meal logged successfully'})

        refresh(true);
      })
      .catch(err => {
        M.toast({html: 'Error logging meal'})

        console.log(err);
      });
  };
  
  const refresh = (force) => {
    if (force) setSavedMealSheet(null);
    refreshSheet(true);
  }

  const refreshSheet = (force) => {
    if (!savedMealSheet || force) {
      const getSheet = server.getSheetsDataByUser(
        'saved_meals',
        currentUser.email
      );
      console.log(getSheet);
      getSheet
        .then(sheet => {
          setSavedMealSheet(sheet);
          setReady(true);
          console.log('getSavedMealSheet callback', savedMealSheet);
        })
        .catch(err => console.log(err));
    }
  }

  const saveMeal = e => {
    const mealName = prompt('What do you want to call this meal?');
    e.preventDefault();
    console.log('send', carbs, protein, fat);
    const newRow = {
      id: new Date().getTime(),
      email: currentUser.email,
      name: mealName,
      protein: protein,
      fat: fat,
      carbs: carbs,
      calories: calculateCalories(),
    };
    server
      .addRowToSheet('saved_meals', newRow)
      .then(newRow => {
        M.toast({html: 'Meal saved'})

        console.log(newRow);
      })
      .catch(err => {
        console.log(err);
        M.toast({html: 'Error saving meal.'})

      });
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
            <div className="col s12 m6 nutrition-form white black-text shadow-center text-center rounded">
              <div className="row padded">
                <div className="col s6">
                  <input
                    className=""
                    type="text"
                    id="protein"
                    placeholder="input grams"
                    onChange={e => setProtein(e.target.value)}
                    value={protein}
                  />
                  <label for="protein">Protein</label>
                </div>
                <div className="col s6">
                  <input
                    className=""
                    type="text"
                    id="carbs"
                    placeholder="input grams"
                    onChange={e => setCarbs(e.target.value)}
                    value={carbs}
                  />
                  <label for="carbs">Carbohydrates</label>
                </div>
                <div className="col s6">
                  <input
                    className=""
                    type="text"
                    id="fats"
                    placeholder="input grams"
                    onChange={e => setFat(e.target.value)}
                    value={fat}
                  />
                  <label for="fats">Fats</label>
                </div>
                <div className="col s6">
                  <input
                    className=""
                    disabled
                    type="text"
                    id="total"
                    placeholder=""
                    value={calculateCalories()}
                  />
                  <label for="total">Total Calories</label>
                </div>
              </div>
              <div className="row text-center">
                <div className="col s12">
                  <button
                    type="submit"
                    className="btn"
                    onClick={e => addToMealSheet(e)}
                  >
                    send
                  </button>
                </div>
                <div className="row text-center">
                  <div className="col s12">
                    <button
                      type="submit"
                      className="btn"
                      onClick={e => saveMeal(e)}
                    >
                      save this meal
                    </button>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12 m6">
              <div class="row text-center padded">
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
            <SavedMealsTable
              sheet={savedMealSheet}
              addToMealSheet={addToMealSheet}
              setProtein={setProtein}
              setFat={setFat}
              setCarbs={setCarbs}
              refresh = {refresh}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

export default NutritionalInformationForm;
