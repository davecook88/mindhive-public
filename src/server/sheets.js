import sheetData from './sheet_helpers/sheetData/sheetData';
import SpreadsheetManager from './sheet_helpers/SpreadsheetManager';

const getMasterSheet = () => SpreadsheetApp.openById(sheetData.masterSheetId);

const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const master = getMasterSheet();
  Logger.log(sheetData.masterSheetId);
  Logger.log(master.getName());
  const obj = {master: master, sheets:{}}
  for (let name in sheetData.sheetNames){
    obj.sheets[name] = new SpreadsheetManager(master, name);
  }
  return obj;
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

