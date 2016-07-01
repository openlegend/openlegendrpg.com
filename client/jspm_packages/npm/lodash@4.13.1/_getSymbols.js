/* */ 
var stubArray = require('./stubArray');
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
function getSymbols(object) {
  return getOwnPropertySymbols(Object(object));
}
if (!getOwnPropertySymbols) {
  getSymbols = stubArray;
}
module.exports = getSymbols;
