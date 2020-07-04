const API_KEY = "***REMOVED***";

var buildCategoryUI = function(country,categories,uiModule) {
  $("#categoryArea").empty();
  for (let index = 0; index < categories.length; index++) {
      if (index == 0 || (index == 1 && categories.length % 2 == 0)) {
          var firstCard = `
              <div class="w3-card-4" id="` + categories[index] + `">
              <div class="w3-display-container w3-text-white">
              <img id="categoryImage0" src="img/categories/` + categories[index] + `.jpg" alt="Lights" style="width:100%">
              <div id="categoryText0" class="w3-xlarge w3-display-bottomleft w3-padding">` + categories[index] + `</div>
              </div>
              </div>`;
          $('#categoryArea').append(firstCard);
          $( "#"+categories[index] ).click(function() {
            changeToCategory(country, $(this).attr('id'),uiModule);
        });
      } else {
          var card = `
              <div class="w3-cell-row">
              <div class=" w3-cell">
              <div class="w3-card-4 " id="` + categories[index] + `">
              <div class="w3-display-container w3-text-white">
              <img src="img/categories/` + categories[index] + `.jpg" alt="Lights" style="width:100%">
              <div class="w3-large w3-display-bottomleft w3-padding">` + categories[index] + `</div>
              </div>
              </div>
              </div>
              <div class=" w3-cell">
              <div class="w3-card-4 " id="` + categories[index + 1] + `">
              <div class="w3-display-container w3-text-white">
              <img src="img/categories/` + categories[index + 1] + `.jpg" alt="Lights" style="width:100%">
              <div class="w3-large w3-display-bottomleft w3-padding">` + categories[index + 1] + `</div>
              </div>
              </div>
              </div>
              </div>`
          $('#categoryArea').append(card);

            $( "#"+categories[index] ).click(function() {
                changeToCategory(country, $(this).attr('id'),uiModule);
            });

            $( "#"+categories[index + 1] ).click(function() {
                changeToCategory(country, $(this).attr('id'),uiModule);
            });
          index++;
      }
  }
}

function changeToCategory(country, category, uiModule) {
    uiModule.hideSettingsButton();
    $("#categoryArea").empty();
    loadCategoryHeadlines(country, category);
}

var buildNewsFeed = function(data,category) {
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

var loadHeadLines = function(country) {

  $.ajax({
      type: 'GET',
      url: 'http://newsapi.org/v2/top-headlines?country=' + country + '&apiKey='+API_KEY,
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

var searchRequest = function(searchText) {

  if (searchText !== "" || searchText) {
      $.ajax({
          type: 'GET',
          url: 'http://newsapi.org/v2/everything?q=' + searchText + '&language=de&apiKey='+API_KEY,
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


var loadCategoryHeadlines = function (country, category) {
  $.ajax({
      type: 'GET',
      url: 'http://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&apiKey='+API_KEY,
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

module.exports = {
  buildCategoryUI,
  loadCategoryHeadlines,
  loadHeadLines
}