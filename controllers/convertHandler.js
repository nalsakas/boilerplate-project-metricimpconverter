function ConvertHandler() {
  this.conv_units = {
    'km': 0.62137,
    'mi': 1.60934,
    'l': 0.26417,
    'gal': 3.78541,
    'kg': 2.20462,
    'lbs': 0.453592
  }

  this.long_units = {
    'kg': 'kilograms',
    'lbs': 'pounds',
    'l': 'liters',
    'gal': 'galons',
    'km': 'kilometers',
    'mi': 'miles'
  }

  this.ret_units = {
    'km': 'mi',
    'mi': 'km',
    'l': 'gal',
    'gal': 'l',
    'kg': 'lbs',
    'lbs': 'kg'
  }

  this.regex = /kg|lbs|l|gal|km|mi/i

  this.getNum = function(input) {
    let result;
    
    /// Split number from unit
    if (input.match(this.regex) != null)
    {
      let pos = input.search(input.match(this.regex)[0])
      result = input.slice(0, pos)
    }
    else 
    {
      throw new Error("invalid unit")
    }

    if (result.length == 0) {
      result = '1'
    }

    /// Check / characters inside number
    const matches = Array.from(result.matchAll('/'))
    switch(matches.length)
    {
      case 0:
        result = +result
        break
      case 1:
        [numerator, demoninator] = result.split('/')
        result = +numerator / +demoninator
        break
      default:
        throw new Error("invalid number")  
    }
    
    return result;
  }
  
  this.getUnit = function(input) {
    let result;
    
    /// Split unit
    if (input.match(this.regex) != null)
    {
      let pos = input.search(input.match(this.regex)[0])
      result = input.slice(pos)
      result = result.toLowerCase()
    }
    else 
    {
      throw new Error("invalid unit")
    }

    if (this.ret_units[result])
    {
      return result
    }
    else
    {
      throw new Error("invalid unit")
    }

  }
  
  this.getReturnUnit = function(initUnit) {
      return this.ret_units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return this.long_units[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    let result = initNum * this.conv_units[initUnit]
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}` 
    return result
  }
  
}

module.exports = ConvertHandler;
