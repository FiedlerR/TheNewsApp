function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
  
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

  function w3_addChip(avaiableChip,name) {
    avaiableChip.remove(); 
    var chip = '<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right" onclick="w3_deleteChip(this,\''+name+'\')">'+name+'</button>'
    document.getElementById("selectedChips").insertAdjacentHTML( 'beforeend', chip );
  }

  function w3_deleteChip(selectedChip,name) {
    selectedChip.remove(); 
    var chip = '<button class="w3-btn w3-round-xxlarge w3-theme-l2 w3-margin-top w3-margin-right" onclick="w3_addChip(this,\''+name+'\')")>'+name+'</button>'
    document.getElementById("availableChips").insertAdjacentHTML( 'beforeend', chip );
  }


  document.addEventListener("backbutton", onBackKeyDown, false);
  function onBackKeyDown() {
    w3_close();
  }