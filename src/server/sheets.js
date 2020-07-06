import sheetData from './sheet_helpers/sheetData/sheetData';
import SpreadsheetManager from './sheet_helpers/SpreadsheetManager'
const getMasterSheet = () => SpreadsheetApp.openById(sheetData.masterSheetId);

const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = (sheetName) => {
  const master = getMasterSheet();
  Logger.log('getSheetsData', sheetName);
  const ssm = new SpreadsheetManager(master, sheetName);
  
  const returnObject =  {
    values:ssm.values,
    rowHeaders:ssm.rowHeaders,
    name:sheetName,
  }
  Logger.log(returnObject);
  return returnObject;
};

export const addRowToSheet = (sheetName, rowObject) => {
  const master = getMasterSheet();
  const ssm = new SpreadsheetManager(master, sheetName);
  const { values, rowHeaders, sheet } = ssm;

  const newRow = [];
  
  for (let header in rowHeaders){
    const colIndex = rowHeaders[header];
    newRow[colIndex] = rowObject[header] || '';
  }

  values.push(newRow);
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  return newRow;
}

export const deleteRowById = (sheetName, id) => {
  const master = getMasterSheet();
  const ssm = new SpreadsheetManager(master, sheetName);
  Logger.log('deleteRowById', ssm);
  const { values, rowHeaders, sheet } = ssm;

  values.some((row, index) => {
    const rowId = row[rowHeaders['id']];
    Logger.log(rowId);
    if (id == rowId){
      sheet.getDataRange().clearContent();
      values.splice(index,1);
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      return true;
    }
  });
  
}

export const getSheetsDataByUser = (sheetName, email) => {
  const sheet = getSheetsData(sheetName);
  Logger.log('getSheetsDataByUser', sheet);
  const { values, rowHeaders } = sheet;
  const filteredValues = values.filter((row, i) => {
    return (
      row[rowHeaders['email']] === email
    )
  });
  const returnObject =  {
    values:filteredValues,
    rowHeaders:rowHeaders,
    name:sheetName,
  };
  Logger.log(sheetName + 'getSheetsDataByUser returns', JSON.stringify(returnObject));
  return returnObject;
}

export const updateAllValues = ssm => {
  const master = getMasterSheet();

  const sheet = master.getSheetByName(ssm.name);

  const { values } = ssm;
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
};

export const updateUserSheet = (user) => {
  const master = getMasterSheet();
  Logger.log('updateUserSheet', user);
  const ssm = new SpreadsheetManager(master, 'users');
  let updated = false;
  const { values, rowHeaders, sheet } = ssm;
  values.forEach(row => {
    const sheetEmail = row[rowHeaders['email']];
    Logger.log('sheetEmail', sheetEmail);
    if (sheetEmail === user.email){
      Object.entries(user).forEach(([key,value]) => {
        Logger.log(value, key)
        row[rowHeaders[key]] = value;
      })
      updated = true;
    }
  });
  Logger.log(values);
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  return 'user updated successfully';
}
