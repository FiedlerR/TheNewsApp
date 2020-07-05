import $ from 'jquery';
import settingsModule from './modules/settingsModule.js';
import uiModule from './modules/uiModule.js';
import newsFeedModule from './modules/newsFeedModule.js';


document.addEventListener("deviceready", deviceReadyEvent, false); // start deviceReadyEvent after deviceready is fired


/**
 * @desc load settings and build ui
 * add eventListener
 */
function deviceReadyEvent() {

    //load settings from localstorage
    settingsModule.getSettingsFromLocalstorage(uiModule); //load settings
    uiModule.activateTheme(settingsModule.getTheme()); // get loaded theme and activate it
    uiModule.setNewsCountry(settingsModule.getCountry()); // get loaded news country and activate it

    //build ui
    newsFeedModule.buildCategoryUI(settingsModule.getCountry(), settingsModule.getCategories(), uiModule); // build category ui in news overview
    newsFeedModule.loadHeadLines(settingsModule.getCountry()); // load headlines
    uiModule.setSelectedCategoryChips(settingsModule.getCategories()); // set category Chips in settings page

    //add eventListener to static ui elements
    document.getElementById("openSettingsPageButton").addEventListener("click", uiModule.openSettingsPage);
    document.getElementById("closeSettingsPageButton").addEventListener("click", uiModule.closeSettingsPage);
    document.getElementById("saveNewsSettings").addEventListener("click", saveNewsSettingsEvent);
    document.getElementById("saveUiSettings").addEventListener("click", saveUiSettingsEvent);
    document.getElementById("clearAllSettings").addEventListener("click", settingsModule.clearALLSettings);
    document.getElementById("backButton").addEventListener("click", backToNewsOverview);
    document.getElementById("searchButton").addEventListener("click", newsFeedModule.searchRequest(uiModule.getSearchText(),settingsModule.getCountry()));

    $(document).on('keypress', 'input', function (event) { // add event listener to the search field
        var keycode = event.keyCode || event.which;
        if (keycode == '13') { //start search request after pressing 'Enter'
            newsFeedModule.searchRequest(uiModule.getSearchText(),settingsModule.getCountry());
        }
    });

    uiModule.hideLoadingBar(); // hide loading screen after all preparations
}


/**
 * @desc use uiModule and settingsModule to save the news settings
 */
function saveNewsSettingsEvent() {
    settingsModule.saveNewsSettings(uiModule.getSelectedNewsCountry(), uiModule.getSelectedCategoriyChips());
    settingsModule.getSettingsFromLocalstorage(uiModule);
    uiModule.setNewsCountry(settingsModule.getCountry());
    newsFeedModule.buildCategoryUI(settingsModule.getCountry(), settingsModule.getCategories(), uiModule); // rebuild the category overview after saving
    newsFeedModule.loadHeadLines(settingsModule.getCountry()); // reload headlines after saving
    uiModule.showMessage("News Settings saved");
}

/**
 * @desc use uiModule and settingsModule to save the ui settings
 */
function saveUiSettingsEvent() {
    let selectedTheme = uiModule.getSelectedTheme();
    settingsModule.saveUiSettings(selectedTheme);
    uiModule.activateTheme(selectedTheme); // activate the selected theme after saving
    uiModule.showMessage("UI Settings saved");
}

/**
 * @desc clean the ui and rebuild the news overview ui
 */
function backToNewsOverview() {
    uiModule.hideBackButton(); // hide the back to news overview button
    newsFeedModule.buildCategoryUI(settingsModule.getCountry(), settingsModule.getCategories(), uiModule); // rebuild the category overview after saving
    newsFeedModule.loadHeadLines(settingsModule.getCountry()); // reload headlines
}