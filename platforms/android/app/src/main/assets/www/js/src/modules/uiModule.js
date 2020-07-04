var openSettingsPage = function () {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
  
var closeSettingsPage = function () {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }
  
var setUiEventListener = function (){

}


  var w3_addChip = function (avaiableChip,name) {
    if(avaiableChip !== null){
      avaiableChip.remove(); 
    }

    var chip = '<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right" onclick="w3_deleteChip(this,\''+name+'\')">'+name+'</button>'
    document.getElementById("selectedChips").insertAdjacentHTML( 'beforeend', chip );
  }

  var w3_deleteChip = function (selectedChip,name) {
    if(selectedChip !== null){
      selectedChip.remove(); 
    }

    var chip = '<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right" onclick="w3_addChip(this,\''+name+'\')")>'+name+'</button>'
    document.getElementById("availableChips").insertAdjacentHTML( 'beforeend', chip );
  }


  document.addEventListener("backbutton", onBackKeyDown, false);
  function onBackKeyDown() {
    w3_close();
  }


  var hideSettingsButton = function  (){
    document.getElementById("openSettingsPageButton").style.display = "none";
    document.getElementById("backButton").style.display = "block";
  }


  var hideBackButton = function  (){
    document.getElementById("openSettingsPageButton").style.display = "block";
    document.getElementById("backButton").style.display = "none";
  }
  hideBackButton ();

  var showToast = function (message) {
    var x = document.getElementById("snackbar");
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
    return $("#newsOverviewSettingsCountry").val();
  }

  var getSelectedTheme = function(){
    return $("#uiSettingsTheme").val();
  }

  var activateTheme = function(theme){
    $('#theme').attr('href', 'css/w3_themes/w3-theme-' + theme + '.css');
  }

  
  module.exports = {
    openSettingsPage,
    closeSettingsPage,
    setUiEventListener,
    getSelectedCategoriyChips,
    getSelectedNewsCountry,
    getSelectedTheme,
    activateTheme
  }