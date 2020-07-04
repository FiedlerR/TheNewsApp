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
    storage.setItem("country", country);
    storage.setItem("categories", JSON.stringify(selectedCategories));
  }

  var saveUiSettings = function (theme) {
    storage.setItem("theme", theme);
  }

  var clearALLSettings = function () {
    localStorage.clear();
  }

  var getSettingsFromLocalstorage = function (uiModule) {

    getCountryFromLocalStorage();
    getCategoriesFromLocalStorage();
    getThemeFromLocalStorage();

    if (storage.getItem("firstStart") === null) {
      storage.setItem("firstStart", "false");
      uiModule.openSettingsPage();
    }
  }

  var getCountry = function () {
    return country;
  }

  var getTheme = function () {
    return theme;
  }

  var getCategories = function () {
    return categories;
  }

  module.exports = {
    getSettingsFromLocalstorage,
    getCountry,
    getTheme,
    getCategories,
    saveNewsSettings,
    saveUiSettings,
    clearALLSettings
  }