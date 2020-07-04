  //save localstorage to storage for easier use
  var storage = window.localStorage;
  //theme setting
  var theme = "black";
  //country setting
  var country = "us";
  //selected categories setting
  var categories = ['general', 'entertainment', 'health', 'science', 'sports', 'technology', 'business'];


  /**
   * @desc load saved country from localstorage
   */
  function getCountryFromLocalStorage() {
    if (storage.getItem("country") === null) {
      storage.setItem("country", "us"); // save default value in localstorage
    } else {
      country = storage.getItem("country"); // load country from localstorage
    }
  }

  /**
   * @desc load saved categories from localstorage
   */
  function getCategoriesFromLocalStorage() {
    if (storage.getItem("categories") === null) {
      storage.setItem("categories", JSON.stringify(categories)); // save default value in localstorage
    } else {
      categories = JSON.parse(storage.getItem("categories")); // load categories from localstorage
    }
  }

  /**
   * @desc load the saved theme from localstorage
   */
  function getThemeFromLocalStorage() {
    if (storage.getItem("theme") === null) {
      storage.setItem("theme", "black"); // save default value in localstorage
    } else {
      theme = storage.getItem("theme"); // load theme from localstorage
    }
  }

  /**
   * @desc save news settings in localstorage
   * @param string country - country which should be saved
   * @param array selectedCategories - selectedCategories which should be saved
   */
  var saveNewsSettings = function (country, selectedCategories) {
    storage.setItem("country", country);
    storage.setItem("categories", JSON.stringify(selectedCategories));
  }

  /**
   * @desc save ui settings in localstorage
   * @param string theme - theme which should be saved
   */
  var saveUiSettings = function (theme) {
    storage.setItem("theme", theme);
  }

  /**
   * @desc delete all settings from localstorage
   */
  var clearALLSettings = function () {
    localStorage.clear();
  }

  /**
   * @desc get all settings from localstorage
   * @param object uiModule
   */
  var getSettingsFromLocalstorage = function (uiModule) {

    getCountryFromLocalStorage();
    getCategoriesFromLocalStorage();
    getThemeFromLocalStorage();

    if (storage.getItem("firstStart") === null) { // check if the app is started for the first time
      storage.setItem("firstStart", "false");
      uiModule.openSettingsPage(); // if first start, open settings page
    }
  }

  /**
   * @desc get country setting
   * @returns string - country setting
   */
  var getCountry = function () {
    return country;
  }

  /**
   * @desc get theme setting
   * @returns string - theme setting
   */
  var getTheme = function () {
    return theme;
  }

  /**
   * @desc get categories setting
   * @returns string - categories setting
   */
  var getCategories = function () {
    return categories;
  }

  /**
   *all module exported functions
   */
  module.exports = {
    getSettingsFromLocalstorage,
    getCountry,
    getTheme,
    getCategories,
    saveNewsSettings,
    saveUiSettings,
    clearALLSettings
  }