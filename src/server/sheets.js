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

export const addSheet = sheetTitle => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = sheetIndex => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = sheetName => {
  SpreadsheetApp.getActive()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};

export const updateAllValues = ssm => {
  const master = getMasterSheet();

  const sheet = master.getSheetByName(ssm.name);

  const { values } = ssm;
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
};
