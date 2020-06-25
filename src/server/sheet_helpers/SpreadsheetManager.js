/**
    Coded by Dave Cook
    www.davecookcodes.com
*/

export default class SpreadsheetManager{
  constructor(wb, sheetName) {
    this.wb = wb;
    this.sheet = this.wb.getSheetByName(sheetName);
    this.values = this.getSheetValues();
    this.rowHeaders = this.getRowHeaders(this.values[0]);
  }
  /**
    * @desc creates an array to reference column number by header name
    * @param string[] topRow
    * @return obj - {header:int,header:int,...}
  */
  getRowHeaders(topRow){
    const obj = {};
    for (let c = 0; c < topRow.length; c++){
      const cell = topRow[c];
      obj[cell] = c;
    }
    return obj;
  }
  /**
    * @desc sets values attribute for object
    * @return array of data from sheet
  */
  getSheetValues(){
    const values = this.sheet.getDataRange().getValues();
    return values;
  }
  /**
    * @desc gets values in column by column header name
    * @param string  headerName
    * @param bool valuesOnly = when true, function returns 1d array. When false, 2d array
    * @return array of data from sheet
  */
  
}