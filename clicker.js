//window stuff
var winWidth;
var prevWinWidth;

//some clicker stuff
var clicks = 0;
var CPS = 0;
var CPC = 1;

var cursor = {
  Price: 15,
  Own: 0,
  priceUp: 5,
  addVal: 1,
  updateElements: function () {
    $("#cursorPrice").html("Cost: " + this.Price.toLocaleString("de"));
    $("#cursorOwn").html("Owned: " + this.Own.toLocaleString("de"));
  },
};

var cursor2 = {
  Price: 1000,
  Own: 0,
  priceUp: 500,
  addVal: 10,
  updateElements: function () {
    $("#cursorPrice2").html("Cost: " + this.Price.toLocaleString("de"));
    $("#cursorOwn2").html("Owned: " + this.Own.toLocaleString("de"));
  },
};

var clicker = {
  Price: 100,
  priceAdd: 50,
  Own: 0,
  updateElements: function () {
    $("#clickerPrice").html("Cost: " + this.Price.toLocaleString("de"));
    $("#clickerOwn").html("Owned: " + this.Own.toLocaleString("de"));
  },
};

var clickerUp = {
  Price: 1000,
  priceAdd: 500,
  Own: 1,
  updateElements: function () {
    $("#clickerUpPrice").html("Cost: " + this.Price.toLocaleString("de"));
    $("#clickerUpOwn").html("Owned: " + (this.Own - 1).toLocaleString("de"));
  },
};

//load from local storage, if there are variables saved (this needs to be AFTER variable declaration)
var doLoad = localStorage.getItem("doLoad");
if (doLoad != null) {
  clicks = +localStorage.getItem("clicks");
  CPS = +localStorage.getItem("CPS");
  CPC = +localStorage.getItem("CPC");
  loadItem(cursor, "cursor");
  loadItem(cursor2, "cursor2");
  loadItem(clicker, "clicker");
  loadItem(clickerUp, "clickerUp");
}

//Function for purchasing buttons
//If no adding to a variable, (eg, CPS) is required, just set addto and addamount to 0
var purchase = {
  noAdd: function (thing, expo) {
    if (clicks >= thing.Price) {
      thing.Own += 1;
      clicks -= thing.Price;
      if (expo) {
        thing.price = thing.price * 2;
      } else {
        thing.Price += thing.priceAdd;
      }
      thing.updateElements();
    }
  },
  add: {
    CPC: function (thing) {
      if (clicks >= thing.Price) {
        CPC += thing.addVal;
        clicks -= thing.Price;
        thing.Price += thing.priceUp;
        thing.Own += 1;
      }
      thing.updateElements();
    },
  },
};

function saveItem(item, id) {
  localStorage.setItem(id + "price", item.Price);
  localStorage.setItem(id + "own", item.Own);
}

function loadItem(item, id) {
  item.Price = +localStorage.getItem(id + "price");
  item.Own = +localStorage.getItem(id + "own");
  item.updateElements();
}

$(document).ready(function () {
  //call each update text function, so our text isn't wrong with loaded variables.
  cursor.updateElements();
  cursor2.updateElements();
  clicker.updateElements();
  clickerUp.updateElements();

  function textUpdate() {
    $("#clicks").html("Clicks: " + clicks.toLocaleString("de"));
    $("#cps").html("Clicks Per Second: " + CPS.toLocaleString("de"));
    $("#cpc").html("Clicks Per Click: " + CPC.toLocaleString("de"));

    CPS = clicker.Own * clickerUp.Own;

    //code for detecting window changes
    winWidth = $(window).width();
    if (prevWinWidth != winWidth) {
      if (winWidth < 1000) {
        $("#mCSS").attr("href", "mStyle.css");
      } else {
        $("#mCSS").attr("href", "");
      }
    }
    prevWinWidth = winWidth;
  }
  setInterval(textUpdate, 100);

  function second() {
    clicks += CPS;

    //Save Items
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("CPS", CPS);
    localStorage.setItem("CPC", CPC);
    saveItem(cursor, "cursor");
    saveItem(cursor2, "cursor2");
    saveItem(clicker, "clicker");
    saveItem(clickerUp, "clickerUp");
    localStorage.setItem("doLoad", "dummy");
  }
  setInterval(second, 1000);
});
