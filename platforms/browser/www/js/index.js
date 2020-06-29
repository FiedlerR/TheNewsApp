/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener("deviceready", appReady, false);
var country = "us";
var categories = ['general', 'entertainment', 'health', 'science', 'sports', 'technology', 'business'];

function appReady() {
    loadSavedData();
    setCategoryChips();
    loadHeadLines(country);
    setCategoryUI(categories);


    $("#newsOverviewSettingsCountry").val(country);

    //setAvailableChips();


    document.getElementById("searchButton").addEventListener("click", searchRequest);
    document.getElementById("saveNewsOverviewSettings").addEventListener("click", saveNewsOverviewSettings);
    document.getElementById("saveUiSettings").addEventListener("click", saveUiSettings);
    document.getElementById("clearAllSettings").addEventListener("click", clearALLSettings);


    $(document).on('keypress', 'input', function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            searchRequest();
        }
    });

    document.getElementById("loaderBar").style.display = "none";
}

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
        w3_open();
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
            text: element.title,
            onClick: "cordova.InAppBrowser.open('" + element.url + "', '_blank', 'location=yes zoom=no');"
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
        url: 'http://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=***REMOVED***',
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
            url: 'http://newsapi.org/v2/everything?q=' + searchText + '&language=de&apiKey=***REMOVED***',
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
        url: 'http://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&apiKey=***REMOVED***',
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