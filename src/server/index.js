import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';
import * as publicRouterFunctions from './routes';
import * as userFunctions from './user';

// Expose public functions by attaching to `global`
global.onOpen = publicUiFunctions.onOpen;
global.addSheet = publicSheetFunctions.addSheet;
global.deleteSheet = publicSheetFunctions.deleteSheet;
global.setActiveSheet = publicSheetFunctions.setActiveSheet;
global.getSheetsData = publicSheetFunctions.getSheetsData;
global.doGet = publicRouterFunctions.doGet;
global.getActiveUserEmail = userFunctions.getActiveUserEmail;
