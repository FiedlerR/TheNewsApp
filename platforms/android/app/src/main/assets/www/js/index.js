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
        window.open = cordova.InAppBrowser.open;
        searchRequest();


        var country = "at";

        document.getElementById("searchButton").addEventListener("click", searchRequest);

        function searchRequest() {

            $.ajax({
                type: 'GET',
                url: 'http://newsapi.org/v2/top-headlines?country='+country+'&apiKey=***REMOVED***',
                data: {
                    get_param: 'value'
                },
                dataType: 'json',
                crossDomain: true,
                success: function (data) {

                    $("#newsFeed").empty();
                    $.each(data.articles, function (index, element) {

                        var itemDiv = $("<div />", {
                            "class": "ui card cardMargin",
                        });

                        var imageDiv = $("<div />", {
                            "class": "image"
                        });

                        
                        var imageTag= $("<img />", {
                            src: element.urlToImage
                        });

                        imageDiv.append(imageTag);

                        itemDiv.append(imageDiv);

                        var contentDiv = $("<div />", {
                            "class": "content"
                        });

                        var newsHeader = $("<a />", {
                            "class": "header",
                            text: element.title,
                            onClick: "cordova.InAppBrowser.open('" + element.url + "', '_blank', 'location=yes zoom=no');"
                        });

                        var sourceDiv = $("<div />", {
                            "class": "meta",
                            text: element.source.name
                        });

                        var publishDateDiv = $("<div />", {
                            "class": "meta",
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
            });
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
