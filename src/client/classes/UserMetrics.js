const getPreviousDayString = (day) => {
  const date = new Date(day);
  date.setDate(date.getDate() - 1);
  const timestamp = date.toISOString();
  return timestamp.slice(0,10);
}

const subtractDates = (d1,d2) => {
  const first = ExcelDateToJSDate(d1);
  const second = ExcelDateToJSDate(d2);
  const time = second - first;
  return time / (1000 * 60 * 60);
}

const ExcelDateToJSDate = (date) =>  new Date(Math.round((date - 25569) * 86400 * 1000));


class UserMetrics {
  constructor(amData, pmData, mealData) {
    console.log('UserMetrics',amData,pmData,mealData)
    this.data = this.createDataObject(amData, pmData);
    this.addCalculatedFields();
    this.addMealData(mealData);
  }

  addMealData(mealData) {
    const { data } = this;
    const { values, rowHeaders} = mealData;
    values.forEach(row => {
      const rowObj = {};
      Object.entries(rowHeaders).forEach(([key,value]) => {
        rowObj[key] = row[value];
      })
      const date = new Date(rowObj.time);
      const shortDate = date.toISOString().slice(0,10);
      if (!data.hasOwnProperty(shortDate)) {
        data[shortDate] = {};
      }
      ['protein','carbs','fat','calories'].forEach(nutrient =>{
        if (data[shortDate][nutrient] && rowObj[nutrient]){
          data[shortDate][nutrient] += rowObj[nutrient];
        } else {
          data[shortDate][nutrient] = rowObj[nutrient];
        }
      })


    })
  }

  addCalculatedFields(){
    const { data } = this;

    for (let day in data){
      const dayBefore = getPreviousDayString(day);
      if (data[dayBefore]){
        const today = data[day];
        const yesterday = data[dayBefore];
        if (yesterday.bed_time && today.wake_up){
          const sleepTime = subtractDates(yesterday.bed_time[0] - 1, today.wake_up[0]);
          today.sleep_time = sleepTime;
        }
        if (yesterday.last_meal && today.first_meal){
          const fastWindow = subtractDates(yesterday.last_meal, today.first_meal);
          today.fast_window = fastWindow;
        }
      }
    }
  }

  createDataObject(am, pm){
    const data = {};

    [am,pm].forEach(sheet => {
      const { values, rowHeaders } = sheet;
      values.forEach(row => {
        const rowObj = {};
        Object.entries(rowHeaders).forEach(([key,value]) => {
          rowObj[key] = row[value];
        })
        const date = new Date(ExcelDateToJSDate(rowObj.timestamp));
        const shortDate = date.toISOString().slice(0,10);
        if (data.hasOwnProperty(shortDate)) {
          Object.entries(rowObj).forEach(([key,value]) => {
            if (data[shortDate].hasOwnProperty(key)){
              data[shortDate][key].push(value);
            } else {
              data[shortDate][key] = [value];
            }
          });
        } else {
          data[shortDate] = {};
          for (let key in rowObj){
            data[shortDate][key] = [rowObj[key]];
          }
          
        }
        
      });
    });
    console.log(data);
    return data;
  }
}
// module.exports = UserMetrics;
export default UserMetrics;