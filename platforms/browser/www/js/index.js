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

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');

        //window.open = cordova.InAppBrowser.open;
        var country = "de";
        loadHeadLines(country);


        /*
        $('#optionBarButton').click(function (){
            $("head link#theme").attr('href','https://www.w3schools.com/lib/w3-theme-green.css');
         });
         */

        $("#newsOverviewSettingsCountry").val(country);
        setAvailableChips();



        $('.ui.dropdown')
        .dropdown()
      ;

      $('.tag.example .ui.dropdown')
        .dropdown({
            allowAdditions: true
        })
        ;


        document.getElementById("searchButton").addEventListener("click", searchRequest);
       // document.getElementById("optionBarButton").addEventListener("click", openOptionBar);
        document.getElementById("saveNewsOverviewSettings").addEventListener("click", saveNewsOverviewSettings);

        

        $(document).on('keypress', 'input', function(event) {   
            var keycode = event.keyCode || event.which;
            if(keycode == '13') {
                searchRequest();
            }
        });

        function openOptionBar (){
            $('.ui.sidebar')
            .sidebar('toggle')
          ;
        }

        function setAvailableChips(){
            var categories = ['general', 'entertainment', 'health', 'science','sports','technology'];
            $.each(categories , function(index, val) { 
                $('#availableChips').append('<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right" onclick="w3_addChip(this,\''+val+'\')")>'+val+'</button>');
            });
        }

   

        function saveNewsOverviewSettings(){
            country = $("#newsOverviewSettingsCountry").val();
            loadHeadLines(country);
        }

        function newFunction(data) {
            $("#newsFeed").empty();
            $.each(data.articles, function (index, element) {

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
                    text: element.publishedAt
                });


                itemDiv.append(imageDiv);

                contentDiv.append(sourceDiv);
                contentDiv.append(newsHeader);
                contentDiv.append(publishDateDiv);
                itemDiv.append(contentDiv);

                $('#newsFeed').append(itemDiv);

            });
        }

        function loadHeadLines(country) {

            $.ajax({
                type: 'GET',
                url: 'http://newsapi.org/v2/top-headlines?country='+country+'&apiKey=***REMOVED***',
                data: {
                    get_param: 'value'
                },
                dataType: 'json',
                crossDomain: true,
                success: function (data) {

                    newFunction(data);
                }
            });
        }

        function searchRequest() {
            var searchText = $("#searchField").val();
            console.log(searchText);

            if(searchText !== "" || searchText){
                $.ajax({
                    type: 'GET',
                    url: 'http://newsapi.org/v2/everything?q='+searchText+'&language=de&apiKey=***REMOVED***',
                    data: {
                        get_param: 'value'
                    },
                    dataType: 'json',
                    crossDomain: true,
                    success: function (data) {
    
                        newFunction(data);
                    }
                });
                loadHeadLines(country);
            }



        }
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    */
    }
};

app.initialize();
