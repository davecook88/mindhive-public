export const doGet = (e) => {
  const html = HtmlService.createHtmlOutputFromFile('main');
  html.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return html;
}