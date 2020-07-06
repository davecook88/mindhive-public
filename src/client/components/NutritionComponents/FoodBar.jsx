import React from 'react';

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

export default FoodBar;