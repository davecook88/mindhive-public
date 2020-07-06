import React from 'react';
import server from '../../server';

const SavedMealsTable = ({sheet, addToMealSheet, setProtein, setFat, setCarbs, refresh}) => {
  console.log('SavedMealsTable', sheet);
  if (!sheet) return null;
  const { values, rowHeaders } = sheet;

  const deleteMeal = (id) => {
    server.deleteRowById('saved_meals', id);
    refresh(true);
  }

  const clickHandler = (protein,fat,carbs) => {
    setProtein(protein);
    setFat(fat);
    setCarbs(carbs);
    addToMealSheet();
  }
  
  return (
    <table>
      <tbody>
      <tr>
        <th>name</th>
        <th>protein</th>
        <th>fat</th>
        <th>carbs</th>
        <th>calories</th>
        <th>add</th>
        <th>delete</th>
      </tr>
      {values.map(row => {
        const protein = row[rowHeaders['protein']];
        const carbs = row[rowHeaders['carbs']];
        const fat = row[rowHeaders['fat']];
        const calories = row[rowHeaders['calories']];
        const id = row[rowHeaders['id']];
        return (
        <tr>
          <td>{row[rowHeaders['name']]}</td>
          <td>{protein}</td>
          <td>{fat}</td>
          <td>{carbs}</td>
          <td>{calories}</td>
          <td><div class="btn" onClick={() => clickHandler(protein,fat,carbs)}>add</div></td>
          <td><div class="btn red" onClick={() => deleteMeal(id)}>delete</div></td>
        </tr>
        )
      })}
      </tbody>
    </table>
  );
};

export default SavedMealsTable;
