var Utility = {};

Utility.convertTemptoDescription = function(temp) {
	if (temp<50) {
		return "cold";
	}

	else if (temp >= 50 && temp<= 75) {
		return "temperate";
	}

	else if (temp >75 && temp<=90) {
		return "hot";
	}

	else if (temp > 90) {
		return "very hot";
	}
}
// Category is for internal use
Utility.convertWeathertoCategory = function(weatherDesc) {
	if (weatherDesc === "Clear") {
		return "clear";

	}

	else if (weatherDesc === "Clouds" || weatherDesc === "Haze") {
		return "clouds";
	}

	else {
		return "other";
	}
}

/* tempRange: cold, temperate, hot, scorching
	scorching: 1000, 1100, 1110, 1111 [>= 1000]
	hot: 100, 110, 111, 1100, 1110, 1111 [100-999, >= 1100]
	temperate: 10, 11, 110, 111, 1110, 1111 [10-99, 110-111, >= 1110]
	cold: 1, 11, 111, 1111
	*/
Utility.checkFoodAgainstTempDesc = function(tempDesc,foodObject) {
	var tempNumber = foodObject.TempNumber;
	if (tempDesc === "very hot" && tempNumber>=1000) {
		return true;
	}
	else if (tempDesc === "hot" && [100, 110, 111, 1100, 1110, 1111].indexOf(tempNumber) > -1) {
		return true;
	} 
	else if (tempDesc === "temperate" && [10, 11, 110, 111, 1110, 1111].indexOf(tempNumber) > -1){
		return true;
	}
	else if (tempDesc === "cold" && [1, 11, 111, 1111].indexOf(tempNumber) > -1) {
		return true;
	}
	else {
		return false;
	}

}

// clear 200 220 222
// clouds 20 22 220 222
// other 2 22 222
Utility.checkFoodAgainstWeatherDesc = function (weatherCat, foodObject) {
	var weatherNumber = foodObject.WeatherNumber;

	if (weatherCat === "clear" && [200, 220, 222].indexOf(weatherNumber) > -1) {
		return true;
	}
	else if (weatherCat === "clouds" && [20, 22, 220, 222].indexOf(weatherNumber) > -1) {
		return true;
	} 
	else if (weatherCat === "other" && [2, 22, 222].indexOf(weatherNumber) > -1) {
		return true;
	}
	else {
		return false;
	}

}

Utility.getRandomIndices = function(arrayLength) {
	var indexes = [];
	var temp, randIdx;

	for(var i = 0; i < arrayLength; i++) {
		indexes[i] = i;
	};
   
	for (var i = 0; i < arrayLength; i++) {
	  randIdx = Math.floor(Math.random() * arrayLength);
	  temp = indexes[i];
	  indexes[i] = indexes[randIdx];
	  indexes[randIdx] = temp;
	}
	return indexes.splice(0, 5);
}

// Utility.addFood - support for clickListener.addFoodBtn
Utility.addFood = (function(){
  // 'bLuEbeRRy PIE' => 'Blueberry_Pie'
  function convertFoodInputToKey(foodInput) {
    var foodKey;
    
    foodKey = foodInput.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    foodKey = foodKey.replace(/ /g, '_');

    return foodKey;
  }

  return {
    convertFoodInputToKey: convertFoodInputToKey
  }
})();

// validates user inputs when adding food to firebase database
Utility.addFood.validator = (function(){
  function validFoodInput(foodInput) {
    var hasVowels = /[aeiou]/i.test(foodInput);
    var hasNoSpecialChar = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(foodInput);
    var hasNoNumbers = !/[0-9]/.test(foodInput);
    var meetsLengthReq = foodInput.length > 2 ? true : false;
  
    return hasVowels && hasNoSpecialChar && hasNoNumbers && meetsLengthReq ? true : false;
  }

  function validTempSelect(tempSelect) {
    return tempSelect > 0 ? true : false;
  }

  function validWeatherSelect(weatherSelect) {
    return weatherSelect > 0 ? true : false;
  }

  return {
    validFoodInput: validFoodInput,
    validTempSelect: validTempSelect,
    validWeatherSelect: validWeatherSelect
  }
})();