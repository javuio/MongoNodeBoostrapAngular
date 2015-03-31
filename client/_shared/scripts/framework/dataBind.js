if (!jQuery) alert('Please load JQuery first');

jQuery.fn.pushData = function (doc, attributeName) {
    var V = ["INPUT", "SELECT", "TEXTAREA"];
    var H = ["H1", "H2", "H3", "H4", "DIV", "SPAN"];
    for (var i = 0 ; i < this.length ; i++) {
        if (!this[i].attributes || !this[i].attributes[attributeName]) continue;
        var propertyName = this[i].attributes[attributeName].value;
        var value = "";
        if (doc[propertyName]) value = doc[propertyName];

        if (V.indexOf(this[i].nodeName) >= 0)
            this[i].value = value;
        else if (H.indexOf(this[i].nodeName) >= 0)
            this[i].innerHTML = value;
        else if (this[i].nodeName == 'A')
            this[i].href = value;
    }
};

jQuery.fn.pullData = function (attributeName) {
    var doc = new Object();
    debugger;
    for (var i = 0 ; i < this.length ; i++) {
        switch (this[i].nodeName) {
            case "INPUT", "SELECT", "TEXTAREA":
                doc[this.attributes[attributeName]] = this[i].value;
                break;
        }

    }
}