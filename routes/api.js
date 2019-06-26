/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNumErorr = convertHandler.getNumError(input);
      var initUnitErorr = convertHandler.getUnitError(input);
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      if (initNumErorr == true && initUnitErorr == true) {
        var toString = "invalid number and unit"
      }
      else if (initNumErorr == true) {
        var toString = "invalid number"
      }
      else if (initUnitErorr == true) {
        var toString = "invalid unit"
      }
      else {
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      }
      let responseObj;
      if (initNumErorr == true || initUnitErorr == true) {
        return res.json(toString)
        //res.send(toString)
      } 
      else {
        responseObj = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString 
        }
        return res.json(responseObj)
      } 
  });
};
