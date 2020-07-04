/*var settingsModule = (function () {
 
    // privates
    var storage = window.localStorage;
    var theme = "black";
    var country = "us";
    var categories = ['general', 'entertainment', 'health', 'science', 'sports', 'technology', 'business'];
   
    function getCountryFromLocalStorage() {
      if (storage.getItem("country") === null) {
          storage.setItem("country", "us");
      } else {
          country = storage.getItem("country");
      }
    }

    function getCategoriesFromLocalStorage() {
      if (storage.getItem("categories") === null) {
          storage.setItem("categories", JSON.stringify(categories));
      } else {
          categories = JSON.parse(storage.getItem("categories"));
      }
    }

    function getThemeFromLocalStorage() {
      if (storage.getItem("theme") === null) {
        storage.setItem("theme", "black");
      } else {
          theme = storage.getItem("theme");
      }
    }
   
   
    // Return an object exposed to the public
    return {
      
      getSettingsFromLocalstorage: function() {

        getCountryFromLocalStorage();
        getCategoriesFromLocalStorage();
        getThemeFromLocalStorage();

        if (storage.getItem("firstStart") === null) {
            storage.setItem("firstStart", "false");
            //w3_open();
        }
      },
      getCountry: function() {
        return country;
      },
      getTheme: function() {
        return theme;
      },
      getCategories: function() {
        return categories;
      },
    };
  })();*/

  var storage = window.localStorage;
  var theme = "black";
  var country = "us";
  var categories = ['general', 'entertainment', 'health', 'science', 'sports', 'technology', 'business'];
 
  function getCountryFromLocalStorage() {
    if (storage.getItem("country") === null) {
        storage.setItem("country", "us");
    } else {
        country = storage.getItem("country");
    }
  }

  function getCategoriesFromLocalStorage() {
    if (storage.getItem("categories") === null) {
        storage.setItem("categories", JSON.stringify(categories));
    } else {
        categories = JSON.parse(storage.getItem("categories"));
    }
  }

  function getThemeFromLocalStorage() {
    if (storage.getItem("theme") === null) {
      storage.setItem("theme", "black");
    } else {
        theme = storage.getItem("theme");
    }
  }

  var saveNewsSettings = function (country, selectedCategories) {
    //var categoriesTemp = Array();
   /* $("#selectedChips :button").each(function () {
        categoriesTemp.push($(this).text());
    });*/
    //categories = categoriesTemp;

    storage.setItem("country", country);
    storage.setItem("categories", JSON.stringify(selectedCategories));
}

var saveUiSettings = function (theme) {
    storage.setItem("theme", theme);
}

  module.exports = {
    getSettingsFromLocalstorage: function(uiModule) {

      getCountryFromLocalStorage();
      getCategoriesFromLocalStorage();
      getThemeFromLocalStorage();

      if (storage.getItem("firstStart") === null) {
          storage.setItem("firstStart", "false");
          uiModule.openSettingsPage();
      }
    },
    getCountry: function() {
      return country;
    },
    getTheme: function() {
      return theme;
    },
    getCategories: function() {
      return categories;
    },
    saveNewsSettings,
    saveUiSettings

  }