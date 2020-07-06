import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';
import * as publicRouterFunctions from './routes';
import * as userFunctions from './user';

// Expose public functions by attaching to `global`
global.onOpen = publicUiFunctions.onOpen;
global.updateAllValues = publicSheetFunctions.updateAllValues;
global.getSheetsData = publicSheetFunctions.getSheetsData;
global.getSheetsDataByUser = publicSheetFunctions.getSheetsDataByUser;
global.updateUserSheet = publicSheetFunctions.updateUserSheet;
global.addRowToSheet = publicSheetFunctions.addRowToSheet;
global.deleteRowById = publicSheetFunctions.deleteRowById;
global.doGet = publicRouterFunctions.doGet;
global.getActiveUserEmail = userFunctions.getActiveUserEmail;
