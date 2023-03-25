function ConvertHandler() {
  this.conv_units = {
    'gal': 3.78541,
    'lbs': 0.453592,
    'mi': 1.60934,
    'L': 0.264172,
    'kg': 2.204624,
    'km': 0.6213727,
  }

  this.long_units = {
    'kg': 'kilograms',
    'lbs': 'pounds',
    'L': 'liters',
    'gal': 'galons',
    'km': 'kilometers',
    'mi': 'miles'
  }

  this.ret_units = {
    'km': 'mi',
    'mi': 'km',
    'L': 'gal',
    'gal': 'L',
    'kg': 'lbs',
    'lbs': 'kg'
  }

  this.regex = /kg|lbs|l|gal|km|mi/i

  this.getNum = function(input) {
    let result;
    let invalid_unit = false
    let invalid_number = false
    
    /// Split number
    const pos = input.search(/[a-z]/i)
    if (pos != -1)
    {
      result = input.slice(0, pos)
    }
    else
    {
      result = input
    }

    if (result.length == 0) {
      result = '1'
    }

    /// Check /, . characters inside number
    try {
      result = this.str2num(result);
    } catch (error) {
      invalid_number = true;
    }
    
    try {
      this.getUnit(input)
    }
    catch(error) {
      invalid_unit = true
    }


    if (invalid_number && invalid_unit) 
    {
      throw new Error("invalid number and unit") 
    }
    else if (invalid_number)
    {
      throw new Error("invalid number")
    }
    else if (invalid_unit)
    {
      throw new Error("invalid unit")
    }

    return result;
  }
  
  this.str2num = function (str) {
    let num = 0;

    const matches = str.match(/\//g)  || [];
    switch (matches.length) {
      case 0:
        num = this.str2decimal(str);
        break;
      case 1:
        const [numerator, demoninator] = str.split("/");
        num = this.str2decimal(numerator) / this.str2decimal(demoninator);
        break;
      default:
        throw new Error("invalid_number");
    }
    return num
  };

  this.str2decimal = function(str)
  {
      let num = 0
      const points = str.match(/\./g) || [];

      switch (points.length) {
      case 0:
        num = parseInt(str);
        break;
      case 1:
        num = parseFloat(str)
        break;
      default:
        throw new Error("invalid_number");
    }
    return num
  }

  this.getUnit = function(input) {
    let result;
    
    /// Split unit
    if (input.match(this.regex) != null)
    {
      let pos = input.search(input.match(this.regex)[0])
      result = input.slice(pos)
      result = result.toLowerCase()
      result = result == "l" ? "L" : result
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
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}` 
    return result
  }
  
}

module.exports = ConvertHandler;
