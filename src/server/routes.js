export const doGet = (e) => {
  const html = HtmlService.createHtmlOutputFromFile('main');
  return html;
}