var openSettingsPage = function () {
    document.getElementById("settingsPage").style.display = "block";
  }
  
var closeSettingsPage = function () {
    document.getElementById("settingsPage").style.display = "none";
  }

  var addChipToSelectedCategories = function (category) {
    var chip = '<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right"  id="selectedCategoryChip'+category+'">'+category+' &times;</button>';
    document.getElementById("selectedChips").insertAdjacentHTML( 'beforeend', chip );
    $( "#selectedCategoryChip"+category).click(function() {
        addChipToAvailableCategories(category);
        $(this).remove();
    }); 
  }

  var addChipToAvailableCategories = function (category) {

    var chip = '<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right" id="availableCategoryChip'+category+'" >' + category + '</button>';
    document.getElementById("availableChips").insertAdjacentHTML( 'beforeend', chip );
    $( "#availableCategoryChip"+category).click(function() {
      addChipToSelectedCategories(category);
      $(this).remove();
  }); 
  }

  var hideSettingsButton = function  (){
    document.getElementById("openSettingsPageButton").style.display = "none";
    document.getElementById("backButton").style.display = "block";
  }


  var hideBackButton = function  (){
    document.getElementById("openSettingsPageButton").style.display = "block";
    document.getElementById("backButton").style.display = "none";
  }

  var showMessage = function (message) {
    var x = document.getElementById("messageBar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  var getSelectedCategoriyChips = function (){
    categoriesTemp = Array();
    $("#selectedChips :button").each(function () {
        categoriesTemp.push($(this).text());
    });
    return categoriesTemp;
  }

  var getSelectedNewsCountry = function (){
    return $("#newsCountrySetting").val();
  }

  var getSelectedTheme = function(){
    return $("#uiSettingsTheme").val();
  }

  var activateTheme = function(theme){
    $('#theme').attr('href', 'css/w3_themes/w3-theme-' + theme + '.css');
  }

  var setNewsCountry = function(country){
    $("#newsCountrySetting").val(country);
  }

  var hideLoadingBar = function(){
    document.getElementById("loaderBar").style.display = "none";
  }

var setSelectedCategoryChips = function(categories) {
  var availableCategories = ['general', 'entertainment', 'health', 'science', 'sports', 'technology', 'business'];
  $.each(availableCategories, function (index, val) {
      if (categories.includes(val)) {
          addChipToSelectedCategories(val);
      } else {
          addChipToAvailableCategories(val);
      }
  });

}

  
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
    setSelectedCategoryChips
  }