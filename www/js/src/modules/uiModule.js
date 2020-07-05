/**
 * uiModule
 * provide functions to build and control the menubar and the settings page
 *  
 */

/**
 * @desc shows the settings page
 */
var openSettingsPage = function () {
  document.getElementById("settingsPage").style.display = "block";
}

/**
 * @desc close the settings page
 */
var closeSettingsPage = function () {
  document.getElementById("settingsPage").style.display = "none";
}

/**
 * @desc remove category chip and add a category chip to selected categories area
 * @param string category - category of the category chip
 */
var addChipToSelectedCategories = function (category) {
  //category chip template
  var chip = '<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right"  id="selectedCategoryChip' + category + '" data-value="' + category + '" >' + category + ' &times;</button>';
  document.getElementById("selectedChips").insertAdjacentHTML('beforeend', chip); // add category chip template to selected chip area
  $("#selectedCategoryChip" + category).click(function () { // add event listener to the added category chip
    addChipToAvailableCategories(category);
    $(this).remove(); //category chip remove itself after event listener is fired
  });
}

/**
 * @desc remove category chip and add a category chip to available categories area
 * @param string category - category of the category chip
 */
var addChipToAvailableCategories = function (category) {
  //category chip template
  var chip = '<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right" id="availableCategoryChip' + category + '" data-value="' + category + '" >' + category + '</button>';
  document.getElementById("availableChips").insertAdjacentHTML('beforeend', chip); // add category chip template to available chip area
  $("#availableCategoryChip" + category).click(function () { // add event listener to the added category chip
    addChipToSelectedCategories(category);
    $(this).remove(); //category chip remove itself after event listener is fired
  });
}

/**
 * @desc hide the settings button in menubar and show the back button
 */
var hideSettingsButton = function () {
  document.getElementById("openSettingsPageButton").style.display = "none";
  document.getElementById("backButton").style.display = "block";
}

/**
 * @desc hide the back button in menubar and show the settings button
 */
var hideBackButton = function () {
  document.getElementById("openSettingsPageButton").style.display = "block";
  document.getElementById("backButton").style.display = "none";
}

/**
 * @desc shows a toast message for 3 seconds
 * @param string message - message which the toast message show
 */
var showMessage = function (message) {
  var x = document.getElementById("messageBar");
  x.className = "show";
  x.innerHTML = message;
  setTimeout(function () { //makes the message after 3 seconds invisible
    x.className = x.className.replace("show", "");
  }, 3000);
}

/**
 * @desc get all category chips from selected categories area
 * @returns array - all category chips from selected categories area
 */
var getSelectedCategoriyChips = function () {
  categoriesTemp = Array(); // prepare new empty array
  $("#selectedChips :button").each(function () { // find all category chips in selected categories area
    categoriesTemp.push($(this).data("value")); // add each category to the array
  });
  return categoriesTemp;
}

/**
 * @desc get selected value from news country dropdown
 * @returns string - news country
 */
var getSelectedNewsCountry = function () {
  return $("#newsCountrySetting").val();
}

/**
 * @desc get selected value from theme dropdown
 * @returns string - theme
 */
var getSelectedTheme = function () {
  return $("#uiSettingsTheme").val();
}

/**
 * @desc activate given theme
 * @param string theme - theme to be activated
 */
var activateTheme = function (theme) {
  $('#theme').attr('href', 'css/w3_themes/w3-theme-' + theme + '.css');
}

/**
 * @desc set dropdown value to given country
 * @param string country - country to be set
 */
var setNewsCountry = function (country) {
  $("#newsCountrySetting").val(country);
}

/**
 * @desc hide the loading screen
 */
var hideLoadingBar = function () {
  document.getElementById("loaderBar").style.display = "none";
}

/**
 * @desc sets the chips in the settings page. 
 * all categories in the array are added as chips to the selected area.
 * all other categories are added as chips to the available area
 * @param string categories - array containing the selected chips
 */
var setSelectedCategoryChips = function (categories) {
  var availableCategories = ['general', 'entertainment', 'health', 'science', 'sports', 'technology', 'business'];
  $.each(availableCategories, function (index, val) {
    if (categories.includes(val)) { // check if categories contain available category 
      addChipToSelectedCategories(val);
    } else {
      addChipToAvailableCategories(val);
    }
  });

}

/**
 * @desc get searchText from user interface
 * @returns string - text from searchfield
 */
var getSearchText = function () {
  return $("#searchField").val();
}

/**
 *all module exported functions
 */
module.exports = {
  openSettingsPage,
  closeSettingsPage,
  getSelectedCategoriyChips,
  getSelectedNewsCountry,
  getSelectedTheme,
  activateTheme,
  setNewsCountry,
  hideLoadingBar,
  hideSettingsButton,
  hideBackButton,
  showMessage,
  setSelectedCategoryChips,
  getSearchText
}