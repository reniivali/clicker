var clicks = 0;
var CPS = 0;
var CPC = 1;
var purchasesMenuClassint = 1;
var doSave = 1;

var cursor = {
    Price: 15,
    Own: 0,
    priceUp: 5,
    addVal: 1,
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
        },
    },
}

$(document).ready(function() {
    function textUpdate () {
        $("#clicks").text(clicks);
        $("#cps").text(CPS);
        $("#cpc").text(CPC);
    }
    setInterval(textUpdate, 100);

    function second() {
        clicks += CPS;
    }
    setInterval(second, 1000);
});