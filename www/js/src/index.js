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


    $(document).on('keypress', 'input', function (event) { // add event listener to the search field
        var keycode = event.keyCode || event.which;
        if (keycode == '13') { //start search request after pressing 'Enter'
            searchRequest();
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


/*
function loadSavedData() {
    var storage = window.localStorage;

    if (storage.getItem("country") === null) {
        storage.setItem("country", "us");
    } else {
        country = storage.getItem("country");
    }

    if (storage.getItem("categories") === null) {
        storage.setItem("categories", JSON.stringify(categories));
    } else {
        categories = JSON.parse(storage.getItem("categories"));
    }

    if (storage.getItem("theme") === null) {
        storage.setItem("theme", "black");
        $("#uiSettingsTheme").val("black");
    } else {
        $('#theme').attr('href', 'css/w3_themes/w3-theme-' + storage.getItem("theme") + '.css');
        $("#uiSettingsTheme").val(storage.getItem("theme"));
    }


    if (storage.getItem("firstStart") === null) {
        storage.setItem("firstStart", "false");
       // w3_open();
    }
}

function setCategoryChips() {
    var availableCategories = ['general', 'entertainment', 'health', 'science', 'sports', 'technology', 'business'];
    $.each(availableCategories, function (index, val) {
        if (categories.includes(val)) {
            w3_addChip(null, val);
        } else {
            w3_deleteChip(null, val);
        }
    });

}

function setAvailableChips() {
    var availableCategories = ['general', 'entertainment', 'health', 'science', 'sports', 'technology', 'business'];
    $.each(availableCategories, function (index, val) {
        $('#availableChips').append('<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right" onclick="w3_addChip(this,\'' + val + '\')")>' + val + '</button>');
    });
}

function setCategoryUI(categories) {
    $("#categoryArea").empty();
    for (let index = 0; index < categories.length; index++) {
        if (index == 0 || (index == 1 && categories.length % 2 == 0)) {
            var firstCard = `
                <div class="w3-card-4" onclick="changeToCategory('` + categories[index] + `')">
                <div class="w3-display-container w3-text-white">
                <img id="categoryImage0" src="img/categories/` + categories[index] + `.jpg" alt="Lights" style="width:100%">
                <div id="categoryText0" class="w3-xlarge w3-display-bottomleft w3-padding">` + categories[index] + `</div>
                </div>
                </div>`;
            $('#categoryArea').append(firstCard);

        } else {

            var index2 = index + 1;
            var card = `
                <div class="w3-cell-row">
                <div class=" w3-cell">
                <div class="w3-card-4 " onclick="changeToCategory('` + categories[index] + `')">
                <div class="w3-display-container w3-text-white">
                <img src="img/categories/` + categories[index] + `.jpg" alt="Lights" style="width:100%">
                <div class="w3-large w3-display-bottomleft w3-padding">` + categories[index] + `</div>
                </div>
                </div>
                </div>
                <div class=" w3-cell">
                <div class="w3-card-4 " onclick="changeToCategory('` + categories[index + 1] + `')">
                <div class="w3-display-container w3-text-white">
                <img src="img/categories/` + categories[index + 1] + `.jpg" alt="Lights" style="width:100%">
                <div class="w3-large w3-display-bottomleft w3-padding">` + categories[index + 1] + `</div>
                </div>
                </div>
                </div>
                </div>`
            $('#categoryArea').append(card);
            index++;
        }
    }
}

function changeToCategory(category) {
    hideSettingsButton();
    $("#categoryArea").empty();
    loadCategoryHeadlines(category);
}

function backToNewsOverview() {
    hideBackButton();
    loadHeadLines(country);
    setCategoryUI(categories);
}

function clearALLSettings(){
    localStorage.clear();
}
/*
function saveNewsOverviewSettings() {
    country = $("#newsOverviewSettingsCountry").val();
    loadHeadLines(country);
    var categoriesTemp = Array();
    $("#selectedChips :button").each(function () {
        categoriesTemp.push($(this).text());
    });
    categories = categoriesTemp;
    setCategoryUI(categories);

    var storage = window.localStorage;
    storage.setItem("country", country);
    storage.setItem("categories", JSON.stringify(categories));
    showToast("News Overview Settings saved");
}

function saveUiSettings() {
    var storage = window.localStorage;
    theme = $("#uiSettingsTheme").val();
    $('#theme').attr('href', 'css/w3_themes/w3-theme-' + theme + '.css');
    storage.setItem("theme", theme);
    showToast("UI Settings saved");
}

function buildNewsFeed(data,category) {
    $("#newsFeed").empty();
    var months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    $.each(data.articles, function (index, element) {


        let current_datetime = new Date(element.publishedAt);
        let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();

        var itemDiv = $("<div />", {
            "class": "w3-card-4 w3-margin w3-animate-bottom",
            onClick: "cordova.InAppBrowser.open('" + element.url + "', '_blank', 'location=yes zoom=no');"
        });

        var imageDiv = $("<div />", {
            "style": "width:100%",
            "class": ""
        });


        var imageTag = $("<img />", {
            "style": "width:100%",
            src: element.urlToImage
        });

        imageDiv.append(imageTag);

        itemDiv.append(imageDiv);

        var contentDiv = $("<div />", {
            "class": "w3-container"
        });

        var newsHeader = $("<a />", {
            "class": "cardTitle",
            text: element.title           
        });

        var sourceDiv = $("<div />", {
            "class": "",
            text: element.source.name
        });

        var publishDateDiv = $("<div />", {
            "class": "",
            text: formatted_date
        });


        itemDiv.append(imageDiv);

        contentDiv.append(sourceDiv);
        contentDiv.append(newsHeader);
        contentDiv.append(publishDateDiv);
        itemDiv.append(contentDiv);

        if(category === null){
            $('#topHeadlines').text("Top Headlines");
        }else{
            $('#topHeadlines').text("Top "+category+" Headlines");
        }
        $('#newsFeed').append(itemDiv);

    });
}

function loadHeadLines(country) {

    $.ajax({
        type: 'GET',
        url: 'http://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=1b570dd2a545435eaf5052fda8513665',
        data: {
            get_param: 'value'
        },
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
            buildNewsFeed(data, null);
        }
    });
}

function searchRequest() {
    var searchText = $("#searchField").val();
    console.log(searchText);

    if (searchText !== "" || searchText) {
        $.ajax({
            type: 'GET',
            url: 'http://newsapi.org/v2/everything?q=' + searchText + '&language=de&apiKey=1b570dd2a545435eaf5052fda8513665',
            data: {
                get_param: 'value'
            },
            dataType: 'json',
            crossDomain: true,
            success: function (data) {

                buildNewsFeed(data);
            }
        });
    } else {
        loadHeadLines(country);
    }
}


function loadCategoryHeadlines(category) {
    $.ajax({
        type: 'GET',
        url: 'http://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&apiKey=1b570dd2a545435eaf5052fda8513665',
        data: {
            get_param: 'value'
        },
        dataType: 'json',
        crossDomain: true,
        success: function (data) {

            buildNewsFeed(data,category);
        }
    });
}
*/