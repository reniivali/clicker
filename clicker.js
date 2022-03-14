//window stuff
var winWidth;
var prevWinWidth;

//some clicker stuff
var clicks = 0;
var CPS = 0;
var CPC = 1;
var purchasesMenuClassint = 1;

var cursor = {
    Price: 15,
    Own: 0,
    priceUp: 5,
    addVal: 1,
    updateElements: function() {
        $('#cursorPrice').html("Cost: " + this.Price);
        $('#cursorOwn').html("Owned: " + this.Own);
    }
}

var cursor2 = {
    Price: 1000,
    Own: 0,
    priceUp: 500,
    addVal: 10,
}

var clicker = {
    Price: 100,
    priceAdd: 50,
    Own: 0,
}

var clickerUp = {
    Price: 1000,
    priceAdd: 500,
    Own: 1,
}


//load from local storage, if there are variables saved (this needs to be AFTER variable declaration)
var doLoad = localStorage.getItem("doLoad")
if (doLoad != null) {
    loadItem(cursor, "cursor");
    loadItem(cursor2, "cursor2");
    loadItem(clicker, "clicker");
    loadItem(clickerUp, "clickerUp");
}

//Function for purchasing buttons
//If no adding to a variable, (eg, CPS) is required, just set addto and addamount to 0
var purchase = {
    noAdd: function(thing) {
        if (clicks >= thing.Price) {
            thing.Own += 1;
            clicks -= thing.Price;
            thing.Price += thing.priceAdd;
        }
    },
    add: {
        CPC: function(thing) {
            if (clicks >= thing.Price) {
                CPC += thing.addVal;
                clicks -= thing.Price;
                thing.Price += thing.priceUp;
                thing.Own += 1;
            }
            thing.updateElements();
        },
    },
}

function saveItem(item, id) {
    localStorage.setItem(id + "price", item.Price);
    localStorage.setItem(id + "own", item.Own);
}

function loadItem(item, id) {
    item.Price = +localStorage.getItem(id + "price");
    item.Own = +localStorage.getItem(id + "own");
    item.updateElements();
}

$(document).ready(function() {
    function textUpdate () {
        $("#clicks").html("Clicks: " + clicks);
        $("#cps").html("Clicks Per Second: " + CPS);
        $("#cpc").html("Clicks Per Click: " + CPC);

        //code for detecting window changes
        winWidth = $(window).width();
        if (prevWinWidth != winWidth) {
            if (winWidth < 1000) {
                $('#mCSS').attr('href', 'mStyle.css');
            } else {
                $('#mCSS').attr('href', '');
            }
        }
        prevWinWidth = winWidth;
    }
    setInterval(textUpdate, 100);

    function second() {
        clicks += CPS;

        //Save Items
        saveItem(cursor, "cursor");
        saveItem(cursor2, "cursor2");
        saveItem(clicker, "clicker");
        saveItem(clickerUp, "clickerUp");
        localStorage.setItem("doLoad", "dummy");
    }
    setInterval(second, 1000);
});
