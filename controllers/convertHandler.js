/*
*
*
*       Complete the handler logic below
*       
*       
*/

// helper function that returns an object with number and units from input
function handlerHelper(input){
    
    // set default error status
    let number_error_status = false;
    let unit_error_status = false;
    
    // regex to seperate value from unit
    var regexStr = input.match(/[a-z]+|[^a-z]+/gi);
    let number = regexStr[0];
    let unit = regexStr[1];
  
    // check for mulitple divisions
    var has_multiple_div = 0;
    for (var i = 0; i < input.length; i++) {
      if (input[i] === "/") {
        has_multiple_div = has_multiple_div + 1
      } 
    }
    if (has_multiple_div > 1){
      number_error_status = true
    }
    if (has_multiple_div == 0) {
      // if user only supplies a unit then set the unit variable and update the excluded number to 1
    if (isNaN(number)) {
      // update unit based on number before updating number
      unit = number
      number = 1;
    }
    }
    if (has_multiple_div == 1) {    
    // check if there is division needed, update number if so
    // returns true if there is div in the user input
    let checkdiv = /\//
    
    if (checkdiv.test(input) == true) {
      // negative lookbehind to get left side of equation
      let div_left_side_regex = /[^/]*/
      let div_left_side_value = number.toString().match(div_left_side_regex)[0]
      // positive lookbehind to get right side of equation
      let div_right_side_regex = /(?<=[/])\d+/
      let div_right_side_value = number.toString().match(div_right_side_regex)[0]
      number = div_left_side_value / div_right_side_value
      }
    }

    if (number < 0) {
      number_error_status = true
    } 
  
    if (unit == undefined) {
      unit_error_status = true;
    }
    
    // check for valid unit types
    var valid_types = ['gal','l','mi','km','lbs','kg']
    var temp_unit_is_valid = false;
    valid_types.forEach(function (item) {
      if (unit.toLowerCase() == item) {
        temp_unit_is_valid = true
      }
    });
    
    if (temp_unit_is_valid == true) {
      unit_error_status = false;
    } else {
      unit_error_status = true;
    }
    let handlerObj = {
      number: Number(number),
      unit: unit,
      number_error: number_error_status,
      unit_error: unit_error_status
    }
    return handlerObj;
}

function ConvertHandler() {

  this.getNumError = function(input) {
    return handlerHelper(input).number_error
  }
  
  this.getUnitError = function(input) {
    return handlerHelper(input).unit_error 
  }
  
  this.getNum = function(input) {
    return handlerHelper(input).number
  };
  
  this.getUnit = function(input) {
    if (handlerHelper(input).unit == undefined) {
        return handlerHelper(input).unit
    } else {
      if (handlerHelper(input).unit == 'L' || handlerHelper(input).unit == 'l') {
        return 'L';
      } else {
        return handlerHelper(input).unit.toLowerCase();  
      }
      
    }
    
  }
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
      case 'GAL':
      case 'gal':
        return 'L'
        break;
      case 'L':
      case 'l':
        return 'gal'
        break;
      case 'LBS':
      case 'lbs':
        return 'kg'
        break;
      case 'KG':
      case 'kg':
        return 'lbs'
        break;
      case 'MI':
      case 'mi':
        return 'km'
        break;
      case 'KM':
      case 'km':
        return 'mi'
        break;
      default:
        'something went wrong with the unit type'
    }
  };

  this.spellOutUnit = function(initUnit) {
    switch(initUnit){
      case 'GAL':
      case 'gal':
        return 'gallons'
        break;
      case 'L':
      case 'l':
        return 'liters'
        break;
      case 'LBS':
      case 'lbs':
        return 'pounds'
        break;
      case 'KG':
      case 'kg':
        return 'kilograms'
        break;
      case 'MI':
      case 'mi':
        return 'miles'
        break;
      case 'KM':
      case 'km':
        return 'kilometers'
        break;
      default:
        'something went wrong with the initial unit type name'
    }
  };
  
  //returnNum
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit){
      case 'gal':
        return parseFloat((initNum * galToL).toFixed(5))
        break;
      case 'L':
        return parseFloat((initNum / galToL).toFixed(5))
        break;
      case 'lbs':
        return parseFloat((initNum * lbsToKg).toFixed(5))
        break;
      case 'kg':
        return parseFloat((initNum / lbsToKg).toFixed(5))
        break;
      case 'mi':
        return parseFloat((initNum * miToKm).toFixed(5))
        break;
      case 'km':
        return parseFloat((initNum / miToKm).toFixed(5))
        break;
      default:
        'something went wrong with the unit conversion'
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
}

module.exports = ConvertHandler;